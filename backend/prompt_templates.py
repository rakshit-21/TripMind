def build_prompt(user_input: str):
    return f"""
Generate a travel itinerary in STRICT JSON format.

Schema:

{{
  "destination": "string",
  "total_days": number,
  "days": [
    {{
      "day": number,
      "title": "string",
      "activities": [
        {{
          "time": "string",
          "title": "string",
          "description": "string"
        }}
      ]
    }}
  ]
}}

User request:
{user_input}

Return ONLY valid JSON.
"""
