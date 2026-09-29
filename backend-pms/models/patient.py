from pydantic import BaseModel, Field, computed_field
from typing import Annotated, Literal, Optional

class Patient(BaseModel):
    id: Annotated[str, Field(..., description='ID of the patient', examples=['P001'])]
    name:Annotated[str, Field(..., description = "Name of the patient")]
    city: Annotated[str, Field(..., description = "City where patient living currently")]
    age: Annotated[int, Field(...,  gt = 0, lt = 120, description = "Age of the patent")]
    gender: Annotated[Literal['Male', 'Female', 'Others'], Field(..., description = "Gender of the patient")]
    height: Annotated[float, Field(..., gt= 0, description = "Hight of the patient in m")]
    weight: Annotated[float, Field(..., description = "Weight of the patient in kg")]
    @computed_field
    @property
    def bmi(self) -> float:
        bmi = round((self.weight / self.height**2), 2)
        return bmi
    
    @computed_field
    @property
    def verdict(self) -> str:
        if self.bmi < 18.5:
            return "Underweight"
        elif self.bmi < 25:
            return "Normal"
        
        elif self.bmi < 30:
            return "Normal"
        else:
            return "Obese"
