## Why This Project?

This project was created to explore how Large Language Models can be integrated into real-world healthcare workflows using a modern full-stack architecture. The focus was on building practical AI features rather than standalone AI experiments.
# AI Enhanced Patient Management System
A full-stack healthcare application built using React, FastAPI, and Ollama (Llama 3.2).

The application enables patient management while leveraging Generative AI to provide personalized health insights, risk assessments, and fitness recommendations based on patient data.
## Overview

## Features
🚀Patient Management :

    Add new patients
    View patient details
    Edit existing patient information
    Calculate BMI automatically
    Health verdict classification
    Sort patients by Height, Weight, and BMI

🤖 AI Health Adviser:

    Analyzes patient attributes and provides:

    BMI Analysis
    Health Risk Summary
    Personalized Recommendations
    Wellness Disclaimer

⚠️ AI Risk Assessment

    Generates a structured risk evaluation:

    Risk Level (Low / Moderate / High)
    Risk Explanation
    Risk Factors
    Preventive Actions

💪 AI Fitness Coach

    Provides personalized fitness guidance:

        Fitness Goal
        Activity Target
        Exercise Plan
        Nutrition Plan
        Lifestyle Recommendations
        Safety Precautions
## Tech Stack
Frontend
    React.js
    React Router
    Bootstrap 5
    Axios
Backend
    Python
    FastAPI
    Pydantic
    REST APIs
Artificial Intelligence
    Ollama
    Llama 3.2
    Prompt Engineering
    Structured JSON Outputs
    AI Response Validation
## System Architecture
┌─────────────────┐
│    React UI     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Axios Services  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│     FastAPI     │
│    Routers      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   AI Service    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Prompt Builder  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│     Ollama      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│    Llama 3.2    │
└─────────────────┘


### AI Progression Flow:

    Patient Data
     │
     ▼
    Prompt Template
        │
        ▼
    Llama 3.2
        │
        ▼
    Structured JSON Response
        │
        ▼
    json.loads()
        │
        ▼
    Pydantic Validation
     │
     ▼
    FastAPI Response
        │
        ▼
    React UI Cards    
   
## Installation Guide
Prerequisites:
    Python 3.11+
    Node.js
    NPM
    Ollama

    ## Clone repository
        git clone https://github.com/your-username/AI-Enhanced-Patient-Management-System.git

    Backend Setup
        cd backend-pms
        Create and activate virtual environment: python -m venv fastenv
        activate the env: fastenv\Scripts\activate(for windows)
        Install dependencies:pip install -r requirements.txt
        Start Fast API: uvicorn main:app --reload
        API : http://localhost:8000
        Swagger: http://localhost:8000/docs

    AI Setup

        Install OLLAMA: https://ollama.com
        Download model: ollama pull llama3.2
        Start Ollama: ollama serve

    Frontend Setup
        cd frontend-pms
        Install dependencies: npm install
        Run application: npm run dev
        Frontend URL: http://localhost:5173/




## Screenshots
Patient List

    screenshots/patient-list.jpeg

AI Health Adviser

    screenshots/ai-health-adviser.jpeg
AI Risk Assessment

    screenshots/ai-risk-assessment.jpeg

AI Fitness Coach

    screenshots/ai-fitness-coach.jpeg


## Project Folder Structure

AI-Enhanced-Patient-Management-System
│
├── backend-pms
│   ├── models
│   ├── routers
│   ├── services
│   ├── main.py
│   ├── config.py
│   ├── requirements.txt
│   └── patient.json
│
├── frontend-pms
│   ├── src
│   ├── public
│   └── package.json
│
├── screenshots
│
├── README.md
└── .gitignore

##Key Learning Outcomes

    This project demonstrates practical experience in:
    Full Stack Development
    REST API Design
    FastAPI Architecture
    Prompt Engineering
    LLM Integration
    Structured AI Responses
    Pydantic Validation
    React UI Development
    AI-powered Healthcare Workflows

## Future Enhancements
    Database Integration
    User Authentication
    Role-Based Access Control
    Medical Report Summarization
    PDF Analysis
    Chat-based AI Assistant
    Retrieval-Augmented Generation (RAG)
    Patient History Analysis
## Author

    Built as part of a Full-Stack AI Engineering learning journey focused on combining:

    React
    FastAPI
    Python
    Ollama
    Llama 3.2
    Prompt Engineering
    AI POWERED APPLICATIONS
