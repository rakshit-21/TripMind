from pydantic import BaseModel
from typing import List


class Activity(BaseModel):
    time: str
    title: str
    description: str


class DayPlan(BaseModel):
    day: int
    title: str
    activities: List[Activity]


class Itinerary(BaseModel):
    destination: str
    total_days: int
    days: List[DayPlan]
