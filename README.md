# 🧠 TripMind AI  
### AI-Powered Travel Itinerary Chatbot

TripMind AI is a **Generative AI–powered travel itinerary chatbot** that creates structured, day-wise travel plans based on user preferences such as destination, duration, budget, and interests.  
The project is built as a **production-style GenAI system**, not just a simple prompt-based chatbot.

---

## 🚀 Features

- 🗺️ **Day-wise AI-generated itineraries**
- 🧠 **Structured JSON output using schema validation**
- 🔁 **Multi-turn conversational memory**
- 📍 **Real-world place data integration**
- ⚙️ **Backend-controlled AI logic (no direct LLM calls from frontend)**
- 📄 **Expandable to PDF export and map view**

---

## 🧩 Architecture Overview

User
↓
Frontend (React / Next.js)
↓
FastAPI Backend
├── Prompt Builder
├── LLM (Gemini / OpenAI)
├── JSON Schema Validation (Pydantic)
├── Conversational Memory
└── External APIs (Places / Weather)
↓
Structured Itinerary Response

---


## 🛠️ Tech Stack

### Frontend
- React / Next.js
- HTML, CSS, JavaScript

### Backend
- Python
- FastAPI
- Pydantic

### AI / GenAI
- Google Gemini API / OpenAI API
- Prompt engineering with strict schema enforcement

### External APIs
- Google Places API / Foursquare API
- (Optional) Weather API

---

## 📁 Project Structure

tripmind-ai/
├── backend/
│ ├── main.py
│ ├── schemas.py
│ ├── prompts/
│ │ └── itinerary_prompt.txt
│ ├── services/
│ │ ├── llm.py
│ │ └── places.py
│ └── utils/
│ └── formatter.py
├── frontend/
│ └── react-app/
└── README.md


---

## 🧠 AI Design Highlights

- **Schema-Constrained Generation**  
  AI responses are validated using Pydantic models to ensure reliability.

- **Hallucination Control**  
  Real-world place data is injected into prompts to ground responses.

- **Stateful Conversations**  
  Supports follow-up queries like:
  > “Add beaches on Day 3”  
  > “Make the itinerary more budget-friendly”

- **Separation of Concerns**  
  Prompting, validation, memory, and formatting handled independently.

---

## 🔄 How It Works

1. User enters travel preferences
2. Backend constructs a constrained prompt
3. LLM generates a structured JSON itinerary
4. Output is validated against schema
5. Itinerary is formatted and returned
6. Follow-up queries modify existing itinerary



---

##🎯 Why This Project Matters

This project demonstrates:
Applied Generative AI system design
Prompt engineering with validation
Real-world API integration
Production-style backend architecture
Focus on reliability and scalability

---

##🚧 Future Enhancements
🗺️ Interactive map-based itinerary view
📄 PDF export of itineraries
💰 Budget breakdown per day
🌦️ Weather-aware planning
🔍 Semantic search over itineraries