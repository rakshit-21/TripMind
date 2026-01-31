from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
import uuid

from schemas import Itinerary
from llm_clients import generate_itinerary
from prompt_templates import build_prompt
from memory import get_session, save_session


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
    session_id: str | None = None


# ---------------- Health Check ----------------
@app.get("/")
def health_check():
    return {"status": "TripMind backend running"}


# ---------------- Generate Itinerary ----------------
@app.post("/generate", response_model=Itinerary)
def generate_itinerary_api(data: GenerateRequest):
    user_prompt = data.prompt

    # get or create session id
    session_id = data.session_id or str(uuid.uuid4())

    previous_context = get_session(session_id)

    if previous_context:
        combined_prompt = previous_context + "\nUser update: " + user_prompt
    else:
        combined_prompt = user_prompt

    save_session(session_id, combined_prompt)

    # build constrained prompt
    prompt = build_prompt(combined_prompt)

    # call LLM
    raw = generate_itinerary(prompt)

    # clean markdown JSON if present
    raw = raw.replace("```json", "").replace("```", "").strip()

    try:
        itinerary = Itinerary(**json.loads(raw))
        return itinerary
    except Exception as e:
        return {
            "error": "Invalid AI output",
            "details": str(e),
            "raw_output": raw,
        }
