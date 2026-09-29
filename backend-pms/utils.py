import json
from config import DATA_FILE
def calculate_bmi(height, weight):
    return round((weight/height**2), 2)

def calculate_verdict(weight):
    if weight < 15.5:
        return "Underweight"
    elif weight < 25:
        return "Normal"
    elif weight < 35:
        return "Overweight"
    else:
        return "Obese" 
        

def load_data():
    with open(DATA_FILE, "r") as f:
        data = json.load(f)
        return data

def save_data(data):
    with open(DATA_FILE, 'w') as f:
        json.dump(data, f)
  