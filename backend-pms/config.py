# config.py

from dotenv import load_dotenv
import os

load_dotenv()

DATA_FILE = os.getenv("DATA_FILE")
OLLAMA_MODEL = "llama3.2"
OLLAMA_URL = "http://localhost:11434"