from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json

from schemas import Itinerary
from llm_clients import generate_itinerary
from prompt_templates import build_prompt


# ---------------- App Setup ----------------
app = FastAPI(title="TripMind AI Backend")

# ---------------- CORS (Frontend Integration) ----------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- Request Schema ----------------
class GenerateRequest(BaseModel):
    prompt: str


# ---------------- Health Check ----------------
@app.get("/")
def health_check():
    return {"status": "TripMind backend running"}


# ---------------- Generate Itinerary ----------------
@app.post("/generate", response_model=Itinerary)
def generate_itinerary_api(data: GenerateRequest):
    # Build constrained prompt
    prompt = build_prompt(data.prompt)

    # Call LLM
    raw = generate_itinerary(prompt)

    # Clean code block formatting if present
    raw = raw.replace("```json", "").replace("```", "").strip()

    try:
        itinerary = Itinerary(**json.loads(raw))
        return itinerary
    except Exception as e:
        return {
            "error": "Invalid AI output",
            "details": str(e),
            "raw_output": raw
        }
