from fastapi import FastAPI
from schemas import Itinerary
from llm_clients import generate_itinerary
import json

app = FastAPI()


@app.post("/generate")
def generate(data: dict):
    raw_output = generate_itinerary(data["prompt"])

    try:
        itinerary = Itinerary(**json.loads(raw_output))
        return itinerary
    except Exception as e:
        return {
            "error": "Invalid AI output",
            "details": str(e)
        }
