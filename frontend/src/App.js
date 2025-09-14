import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [formData, setFormData] = useState({
    applicationOverview: '',
    numPrompts: 10,
    metaPrompt: '',
    document: null,
    selectedCategories: [] // Changed to array for multi-select
  });
  const [generatedPrompts, setGeneratedPrompts] = useState([]);
  const [excelFile, setExcelFile] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [showQrModal, setShowQrModal] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Available categories
  const categories = [
    "Prompt Injection",
    "Data Leakage",
    "Jailbreaking",
    "Ethical Concerns",
    "Adversarial Examples",
    "Model Evasion",
    "Privacy Violations",
    "Code Injection",
    "Logic Flaws",
    "Unauthorized API Access",
    "Backdoor Triggers",
    "Command Injection",
    "Information Disclosure",
    "Denial of Service (DoS)",
    "Unintended Feature Activation",
    "Identity Spoofing",
    "Social Engineering Assistance",
    "Malicious File Upload",
    "Resource Exhaustion"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      document: e.target.files[0]
    }));
  };

  const toggleCategory = (category) => {
    setFormData(prev => {
      const newCategories = prev.selectedCategories.includes(category)
        ? prev.selectedCategories.filter(c => c !== category)
        : [...prev.selectedCategories, category];
      
      return {
        ...prev,
        selectedCategories: newCategories
      };
    });
  };

  const removeCategory = (category) => {
    setFormData(prev => ({
      ...prev,
      selectedCategories: prev.selectedCategories.filter(c => c !== category)
    }));
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const validateForm = () => {
    if (!formData.applicationOverview.trim()) {
      setError('Application overview is required');
      return false;
    }
    
    if (!formData.metaPrompt.trim()) {
      setError('Meta prompt is required');
      return false;
    }
    
    if (formData.selectedCategories.length === 0) {
      setError('At least one category must be selected');
      return false;
    }
    
    if (formData.numPrompts < 1 || formData.numPrompts > 100) {
      setError('Number of prompts must be between 1 and 100');
      return false;
    }
    
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setError('');
    setQrCode('');
    setShowQrModal(false);
    
    const data = new FormData();
    data.append('applicationOverview', formData.applicationOverview);
    data.append('numPrompts', formData.numPrompts);
    data.append('metaPrompt', formData.metaPrompt);
    
    // Append each selected category
    formData.selectedCategories.forEach(category => {
      data.append('selectedCategories', category);
    });
    
    if (formData.document) {
      data.append('document', formData.document);
    }
    
    try {
      const response = await fetch('http://localhost:5000/api/generate-prompts', {
        method: 'POST',
        body: data
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setGeneratedPrompts(result.prompts);
        setExcelFile(result.excelFile);
        
        if (result.excelFile) {
          const qrResponse = await fetch(`http://localhost:5000/api/generate-qr/${result.excelFile}`);
          if (qrResponse.ok) {
            const blob = await qrResponse.blob();
            const qrUrl = URL.createObjectURL(blob);
            setQrCode(qrUrl);
          }
        }
      } else {
        setError(result.error || 'Failed to generate prompts');
      }
    } catch (err) {
      setError('Network error. Please check if the server is running.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/download-excel/${excelFile}`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'security_testing_prompts.xlsx';
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      } else {
        setError('Failed to download Excel file');
      }
    } catch (err) {
      setError('Error downloading file');
    }
  };

  const handleShowQr = () => {
    setShowQrModal(true);
  };

  const handleCloseQrModal = () => {
    setShowQrModal(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>AI Security Testing Prompt Generator</h1>
        <p>Automate your security testing with AI-generated prompts</p>
      </header>
      
      <main className="main-content">
        <form onSubmit={handleSubmit} className="prompt-form">
          <div className="form-group">
            <label htmlFor="applicationOverview">Application Overview *</label>
            <textarea
              id="applicationOverview"
              name="applicationOverview"
              value={formData.applicationOverview}
              onChange={handleInputChange}
              placeholder="Describe what the AI agent or system does..."
              required
              rows="4"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="numPrompts">Number of Prompts to Generate *</label>
            <input
              type="number"
              id="numPrompts"
              name="numPrompts"
              value={formData.numPrompts}
              onChange={handleInputChange}
              min="1"
              max="100"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="metaPrompt">Meta Prompt (System Prompt) *</label>
            <textarea
              id="metaPrompt"
              name="metaPrompt"
              value={formData.metaPrompt}
              onChange={handleInputChange}
              placeholder="Enter the system prompt of the AI agent..."
              required
              rows="4"
            />
          </div>

          <div className="form-group">
            <label>Select Categories *</label>
            <div className="multi-select-dropdown">
              <div 
                className="dropdown-toggle"
                onClick={toggleDropdown}
              >
                <div className="selected-tags">
                  {formData.selectedCategories.length === 0 ? (
                    <span className="placeholder">Select categories...</span>
                  ) : (
                    formData.selectedCategories.map(category => (
                      <span key={category} className="selected-tag">
                        {category}
                        <span 
                          className="remove-tag"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeCategory(category);
                          }}
                        >
                          ×
                        </span>
                      </span>
                    ))
                  )}
                </div>
                <span className="dropdown-arrow">▼</span>
              </div>
              
              {isDropdownOpen && (
                <div className="dropdown-menu">
                  {categories.map(category => (
                    <label key={category} className="dropdown-item">
                      <input
                        type="checkbox"
                        checked={formData.selectedCategories.includes(category)}
                        onChange={() => toggleCategory(category)}
                      />
                      <span className="checkmark"></span>
                      {category}
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="document">Upload Document (Optional)</label>
            <input
              type="file"
              id="document"
              name="document"
              onChange={handleFileChange}
              accept=".txt,.pdf,.doc,.docx"
            />
            <small>Supported formats: TXT, PDF, DOC, DOCX (Max 16MB)</small>
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button 
            type="submit" 
            disabled={isLoading}
            className="generate-btn"
          >
            {isLoading ? 'Generating Prompts...' : 'Generate Prompts'}
          </button>
        </form>
        
        {generatedPrompts.length > 0 && (
          <div className="results-section">
            <h2>Generated Prompts ({generatedPrompts.length})</h2>
            
            <div className="download-options">
              <button onClick={handleDownload} className="download-btn">
                Download Excel File
              </button>
              
              {qrCode && (
                <button onClick={handleShowQr} className="qr-btn">
                  Generate QR Code for Mobile
                </button>
              )}
            </div>
            
            <div className="prompts-list">
              {generatedPrompts.map((prompt, index) => (
                <div key={index} className="prompt-card">
                  <div className="prompt-header">
                    <span className={`severity-badge severity-${prompt.severity.toLowerCase()}`}>
                      {prompt.severity}
                    </span>
                    <span className="category">{prompt.category}</span>
                  </div>
                  <p className="prompt-text">{prompt.prompt}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* QR Code Modal */}
        {showQrModal && (
          <div className="modal-overlay" onClick={handleCloseQrModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Scan QR Code to Download on Mobile</h3>
                <button className="close-btn" onClick={handleCloseQrModal}>×</button>
              </div>
              <div className="modal-body">
                <img src={qrCode} alt="QR Code for Excel Download" className="qr-code" />
                <p>Scan this QR code with your mobile device to download the Excel file</p>
                <div className="mobile-instructions">
                  <h4>How to use:</h4>
                  <ol>
                    <li>Open your camera or QR code scanner app on your mobile device</li>
                    <li>Point it at this QR code</li>
                    <li>Tap the link that appears</li>
                    <li>Confirm the download when prompted</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <footer className="App-footer">
        <p>AI Security Testing Prompt Generator v1.0</p>
      </footer>
    </div>
  );
};

export default App;