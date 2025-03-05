AI-Based Skill Gap Analyzer with Smart Course Recommendations

Introduction

The AI-Based Skill Gap Analyzer is an intelligent system designed to help professionals and students identify skill gaps in their resumes and receive personalized course recommendations. By leveraging AI, automation, and integration with platforms like Coursera and YouTube, the system provides a complete roadmap for career growth.

---

Problem Statement

In today's competitive job market, individuals often struggle to identify the exact skill gaps preventing them from securing their desired roles. Generic career advice lacks personalization, and finding the right learning resources (from platforms like Coursera or YouTube) is time-consuming, making skill development inefficient.

---

Proposed Solution

Our AI-Based Skill Gap Analyzer bridges skill gaps through the following steps:

1. Resume Upload: Users upload their resumes and enter a target job role.
2. Skill Extraction: The system uses GeminiAI to extract skills from the resume and compares them with job requirements.
3. Course Recommendations: LangChain Agents fetch course recommendations from Coursera.
4. Video Tutorials: The YouTube API recommends video tutorials for missing skills.
5. Personalized Learning Path: The system suggests a tailored learning path for users to upskill efficiently.

---

Features

- AI-Powered Skill Gap Detection: Identifies missing skills by analyzing resumes and job requirements.
- Automated Course Recommendations: Fetches relevant courses from Coursera.
- YouTube Integration: Recommends free video tutorials for skill-building.
- Personalized Learning Path: Provides a customized roadmap for upskilling.

---

Technologies Used

- Frontend: Next.js (React framework) for the user interface.
- Backend: FastAPI for resume parsing, AI model calls, and API integration.
- AI Model: GeminiAI API for skill extraction and matching.
- LangChain Agents: Automates data extraction from Coursera.
- YouTube Data API v3: Fetches relevant video tutorials from YouTube.

---

Installation and Setup

Prerequisites

- React.js (for frontend)
- FastAPI (Python) (for backend)
- Gemini API key
- YouTube Data API key

---

Set up the frontend
cd frontend
npm install
npm start

---

Set up the backend

cd backend
pip install -r requirements.txt
python main.py

---

Configure Environment Variables:
GEMINI_API_KEY
YOUTUBE_API_KEY
GOOGLE_API_KEY

Team members

- Nithin Venkat Sharma (API Integration, AI Processing)
- Nishitha Kamalapathi (Frontend, UI/UX Design)
- Chittesh (Backend)

---

License

MIT License © 2025 Team Novichoks

-HACKATHON

------------------
--backend
------------------
    -main.py
    -env
--------------------
--frontend
--------------------
    -skillGapAnalyzer
    -node modules
    -public
    -src
















    
        -assets
        -components
            -about.jsx
            -features.jsx
            -header.jsx
            -home.jsx
            -navbar.jsx
        -App.css
        -App.jss
        -index.css
        -main.jsx
        -README.md