from fastapi import APIRouter, Body
from services.ai_service import generate_ai_response
from services.prompt_builder import adviser_prompt, risk_prompt, fitness_prompt

router = APIRouter(
    prefix="/ai",
    tags=["AI"]
)

@router.post("/ask")
def ask(payload: dict = Body(...)):
    prompt = adviser_prompt(payload)
    print(prompt)
    return {
        "answer": generate_ai_response(prompt)
    }

@router.post('/risk_assessment')
def resk_assessment(payload: dict=Body(...)):
    prompt = risk_prompt(payload)
    print(prompt,'=========================')
    return {"answer": generate_ai_response(prompt)}

@router.post('/fitness_adviser')
def resk_assessment(payload: dict=Body(...)):
    prompt = fitness_prompt(payload)
    print(prompt,'=========================')
    return {"answer": generate_ai_response(prompt)}