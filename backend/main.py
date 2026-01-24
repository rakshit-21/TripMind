from schemas import Itinerary
import json

@app.post("/generate")
def generate(data: dict):
    raw_output = generate_itinerary(data["prompt"])

    try:
        itinerary = Itinerary(**json.loads(raw_output))
        return itinerary
    except Exception:
        return {"error": "Invalid AI output"}
