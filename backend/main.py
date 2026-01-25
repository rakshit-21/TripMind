from fastapi import FastAPI
from backend.schemas import Itinerary
from backend.llm_clients import generate_itinerary
from backend.prompt_templates import build_prompt
import json

app = FastAPI()

@app.post("/generate")
def generate(data: dict):
    prompt = build_prompt(data["prompt"])
    raw = generate_itinerary(prompt)
    raw = raw.replace("```json", "").replace("```", "").strip()


    try:
        itinerary = Itinerary(**json.loads(raw))
        return itinerary
    except Exception as e:
        return {"error": "Invalid AI output", "details": str(e)}

