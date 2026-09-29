from pydantic import BaseModel
from typing import List

class AIAdviceResponse(BaseModel):
    bmi_analysis: str
    health_risk: str
    recommendations: List[str]
    disclaimer: str