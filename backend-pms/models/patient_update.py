from pydantic import BaseModel, Field, computed_field
from typing import Annotated, Literal, Optional

class PatientUpdate(BaseModel):
    name:Annotated[Optional[str], Field(default=None)]
    city: Annotated[Optional[str], Field(default= None)]
    age: Annotated[Optional[int], Field(gt = 0, lt = 120, default=None)]
    gender: Annotated[Optional[Literal['Male', 'Female', 'Others']], Field(default= "Others")]
    height: Annotated[Optional[float], Field(gt= 0, default = None)]
    weight: Annotated[Optional[float], Field(gt= 0, default = None)]
