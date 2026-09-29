from utils import load_data, save_data
from models.patient import Patient
from models.patient_update import PatientUpdate
from fastapi import HTTPException
from fastapi.responses import JSONResponse
from utils import calculate_bmi, calculate_verdict
def welcome():
    return "Welcome to Patient management system"

def patient_detail(patient_id):
    data = load_data()
    print(data) 
    if patient_id in data:
        return data[patient_id]
    
    raise HTTPException(status_code = 404, detail= 'Patient Not Found')

def get_sorted_patient(sort_by, order):
    print(sort_by, order)
    print(repr(sort_by))
    data = load_data()
    options_sort = ['height', 'weight', 'bmi']
    options_order = ['asc', 'desc']
    order_value = True if order == 'desc' else False
    if sort_by.strip() not in options_sort:
        raise HTTPException(status_code = 403, detail = 'Not a valid sort by parameter')
    if order.strip() not in options_order:
        raise HTTPException(status_code = 403, detail = 'Not a valid order parameter')
    
    sorted_data = sorted(data.values(), key= lambda x: x.get(sort_by, 0), reverse=order_value)
    return sorted_data

def save_patient(patient):
        # load existing data
    data = load_data()

    # check if the patient already exists
    if patient.id in data:
        raise HTTPException(status_code=400, detail='Patient already exists')

    # new patient add to the database
    data[patient.id] = patient.model_dump(exclude=['id'])

    # save into the json file
    save_data(data)

    return JSONResponse(status_code=201, content={'message':'patient created successfully'})

def update_patient(patient_id, patient):
    data = load_data()
    if patient_id in data:
        selected_patient = data[patient_id]
        selected_patient['name'] = patient.name if patient.name is not None else selected_patient['name']
        selected_patient['city'] = patient.city if patient.city is not None else selected_patient['city']
        selected_patient['age'] = patient.age if patient.age is not None else selected_patient['age']
        selected_patient['gender'] = patient.gender if patient.gender is not None else selected_patient['gender']
        selected_patient['height'] = patient.height if patient.height is not None else selected_patient['height']
        selected_patient['weight'] = patient.weight if patient.weight is not None else selected_patient['weight']

        selected_patient['bmi'] = calculate_bmi(
            selected_patient['height'],
            selected_patient['weight']
        )

        selected_patient['verdict'] = calculate_verdict(
            selected_patient['weight']
        )
        
        print(selected_patient)
        
        data[patient_id] = selected_patient
        save_data(data)
        return {"message": "Patient Details updated successfully"} 
    else:
        return HTTPException(status_code="404", detail="Please enter valid patient Id")   
