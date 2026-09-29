from pydantic import BaseModel

class PatientResponse(BaseModel):
    name: str
    city: str
    age: int
    gender: str
    height: float
    weight: float
    bmi: float
    verdict: str
    