
from fastapi import FastAPI
from routers.patient import router as patient
from routers.ai import router as ai
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
  
app.include_router(patient)
app.include_router(ai)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

        
