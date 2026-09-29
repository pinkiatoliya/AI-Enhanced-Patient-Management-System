from fastapi import APIRouter
from fastapi import FastAPI, HTTPException, Query

from utils import *
from models.patient import Patient
from models.patient_update import PatientUpdate
from models.res_patient import PatientResponse
from services.patient import *
router = APIRouter(prefix="/patient", tags=["patient"])

@router.get('/')
def hello():
    return welcome()

@router.get('/about')
def about():
    return {"message": "Patient Management system allows client to perform CRUD operation on Patients Data. Also we are aiming here to build a perfect API's suits to support this system end to end. You can see our docs page to have a look of all the API's being developed here."}

@router.get('/view')
def view_data():
    return load_data()

@router.get('/view/{patient_id}', response_model=PatientResponse)
def view_patient_detail(patient_id: str):
    return patient_detail(patient_id)

@router.get('/sort')
def view_details_by_order(sort_by: str = Query(..., description= 'Sort by height, weight or BMI'), order: str = Query(description = 'Order by desc or asc')):
    return get_sorted_patient(sort_by, order)

@router.post('/create')
def create_patient(patient: Patient):
    return save_patient(patient)
 

@router.put('/edit/{patient_id}')
def updatePatient(patient_id, patient: PatientUpdate):
    return update_patient(patient_id, patient)