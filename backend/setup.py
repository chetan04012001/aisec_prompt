#!/usr/bin/env python3
"""
Setup script for AI Security Testing Prompt Generator
Helps configure environment variables
"""

import os
from pathlib import Path

def setup_environment():
    """Setup environment variables"""
    env_file = Path('.env')
    
    if not env_file.exists():
        print("Creating .env file...")
        with open('.env', 'w') as f:
            f.write("CEREBRAS_API_KEY=your_actual_cerebras_api_key_here\n")
            f.write("FLASK_ENV=development\n")
            f.write("FLASK_DEBUG=1\n")
        print(".env file created. Please update CEREBRAS_API_KEY with your actual API key.")
    else:
        print(".env file already exists.")
        
        # Check if placeholder API key is still present
        with open('.env', 'r') as f:
            content = f.read()       
        if "your_actual_cerebras_api_key_here" in content:
            print("⚠️ WARNING: You need to update CEREBRAS_API_KEY in .env file with your actual API key.")
    
    print("\nTo get a Cerebras API key:")
    print("1. Visit https://www.cerebras.ai/")
    print("2. Sign up for an account")
    print("3. Navigate to API section to get your key")
    print("4. Replace 'your_actual_cerebras_api_key_here' in .env file with your real key")

if __name__ == '__main__':
    setup_environment()
