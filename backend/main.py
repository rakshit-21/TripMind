from fastapi import FastAPI
<<<<<<< HEAD
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
=======
from backend.schemas import Itinerary
from backend.llm_clients import generate_itinerary
from backend.prompt_templates import build_prompt
from backend.memory import get_session, save_session
>>>>>>> fe1ee836ac3e1a680e114109bf83edbce275be08
import json
import uuid

from schemas import Itinerary
from llm_clients import generate_itinerary
from prompt_templates import build_prompt

<<<<<<< HEAD

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
=======
@app.post("/generate")
def generate(data: dict):
    user_prompt = data["prompt"]

    # get or create session id
    session_id = data.get("session_id") or str(uuid.uuid4())

    previous = get_session(session_id)

    if previous:
        combined_prompt = previous + "\nUser update: " + user_prompt
    else:
        combined_prompt = user_prompt

    save_session(session_id, combined_prompt)

    prompt = build_prompt(combined_prompt)
    raw = generate_itinerary(prompt)

>>>>>>> fe1ee836ac3e1a680e114109bf83edbce275be08
    raw = raw.replace("```json", "").replace("```", "").strip()

    try:
        itinerary = Itinerary(**json.loads(raw))
        return {
            "session_id": session_id,
            "itinerary": itinerary
        }
    except Exception as e:
<<<<<<< HEAD
        return {
            "error": "Invalid AI output",
            "details": str(e),
            "raw_output": raw
        }
=======
        return {"error": "Invalid AI output", "details": str(e)}
>>>>>>> fe1ee836ac3e1a680e114109bf83edbce275be08
