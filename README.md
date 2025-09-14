AI Security Testing Prompt Generator
A full-stack application that generates specialized security testing prompts for AI systems using Cerebras AI. This tool helps developers and security professionals create comprehensive test cases to identify vulnerabilities in AI assistants and language models.

https://img.shields.io/badge/React-18.2.0-blue
https://img.shields.io/badge/Flask-2.3.3-green
https://img.shields.io/badge/Python-3.8%252B-yellow

✨ Features
AI-Powered Generation: Leverages Cerebras API to create sophisticated security testing prompts

Multi-Category Selection: Advanced dropdown interface for selecting multiple security testing categories

Excel Export: Automatically generates formatted Excel files with categorized prompts

QR Code Integration: Generate scannable QR codes for mobile download convenience

Document Context: Supports file uploads for context-aware prompt generation

Responsive Design: Works seamlessly on desktop and mobile devices

🚀 Quick Start
Prerequisites
Node.js (v14 or higher)

Python 3.8+

Cerebras API key

Installation
Clone the repository

bash
git clone https://github.com/your-username/ai-security-prompt-generator.git
cd ai-security-prompt-generator
Backend Setup

bash
cd backend
pip install -r requirements.txt
Create a .env file:

text
CEREBRAS_API_KEY=your_api_key_here
Frontend Setup

bash
cd frontend
npm install
Run the Application

Start backend: python app.py (port 5000)

Start frontend: npm start (port 3000)

📖 Usage
Enter your AI system's overview and meta prompt

Select one or multiple security testing categories

Specify the number of prompts to generate (1-100)

Optionally upload context documents

Generate prompts and download as Excel or via QR code

🔧 API Endpoints
Endpoint	Method	Description
/api/generate-prompts	POST	Generate security prompts
/api/download-excel/<filename>	GET	Download Excel file
/api/generate-qr/<filename>	GET	Generate QR code
/api/health	GET	Health check
🛡️ Supported Security Categories
Prompt Injection

Data Leakage

Jailbreaking

Ethical Concerns

Adversarial Examples

Model Evasion

Privacy Violations

Code Injection

Logic Flaws

Unauthorized API Access

Backdoor Triggers

Command Injection

Information Disclosure

Denial of Service (DoS)

Unintended Feature Activation

Identity Spoofing

Social Engineering Assistance

Malicious File Upload

Resource Exhaustion

📁 Project Structure
text
ai-security-prompt-generator/
├── backend/
│   ├── app.py                 # Flask application
│   ├── requirements.txt       # Python dependencies
│   └── .env                  # Environment variables
├── frontend/
│   ├── src/
│   │   ├── App.js            # Main React component
│   │   ├── App.css           # Application styles
│   │   └── index.js          # React entry point
│   └── package.json          # Frontend dependencies
└── README.md
🤝 Contributing
Fork the repository

Create a feature branch (git checkout -b feature/amazing-feature)

Commit your changes (git commit -m 'Add amazing feature')

Push to the branch (git push origin feature/amazing-feature)

Open a Pull Request

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

⚠️ Note
This tool requires a valid Cerebras API key for full functionality. Without it, the application will use a limited set of fallback prompts.