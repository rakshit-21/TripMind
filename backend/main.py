from fastapi import FastAPI
from backend.schemas import Itinerary
from backend.llm_clients import generate_itinerary
from backend.prompt_templates import build_prompt
from backend.memory import get_session, save_session
import json
import uuid

app = FastAPI()

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

    raw = raw.replace("```json", "").replace("```", "").strip()

    try:
        itinerary = Itinerary(**json.loads(raw))
        return {
            "session_id": session_id,
            "itinerary": itinerary
        }
    except Exception as e:
        return {"error": "Invalid AI output", "details": str(e)}