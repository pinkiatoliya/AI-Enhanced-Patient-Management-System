import requests
import json
from models.ai_advise_response import AIAdviceResponse
from config import (OLLAMA_URL, OLLAMA_MODEL)

def generate_ai_response(prompt):
    try:
        response = requests.post(
            f'''{OLLAMA_URL}/api/generate''',
            json={
                "model": OLLAMA_MODEL,
                "prompt": prompt,
                "format": "json",
                "stream": False,
                "options": {"temperature": 0.3}
                
            },
        )
        ollama_response = response.json()
        llm_json_string = ollama_response.get("response")
        result = json.loads(llm_json_string)
        print("===================================")
        print(result)
        print('===================================')
        if not llm_json_string:
            raise ValueError("No response received from model")
        # validated_response = AIAdviceResponse.model_validate(result)        
        return result
    except Exception as e:
        raise Exception(
        f"LLM Service Error: {e}"
        )


    # return response.json()


    