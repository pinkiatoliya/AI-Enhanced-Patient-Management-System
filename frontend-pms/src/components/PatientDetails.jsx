import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPatientById } from "../services/patientService";

function PatientDetails() {
  const { id } = useParams();

  const [patient, setPatient] = useState(null);

  useEffect(() => {
    loadPatient();
  }, []);

  const loadPatient = async () => {
    const response = await getPatientById(id);
    setPatient(response.data);
  };

  if (!patient) {
    return <h4>Loading...</h4>;
  }

  return (
    <div>
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h3>Patient Details</h3>
        </div>

        <div className="card-body">
          <div className="row">

            <div className="col-md-6 mb-3">
              <strong>Patient ID</strong>
              <p>{patient.id}</p>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Name</strong>
              <p>{patient.name}</p>
            </div>

            <div className="col-md-6 mb-3">
              <strong>City</strong>
              <p>{patient.city}</p>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Age</strong>
              <p>{patient.age}</p>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Gender</strong>
              <p>{patient.gender}</p>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Height</strong>
              <p>{patient.height} cm</p>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Weight</strong>
              <p>{patient.weight} kg</p>
            </div>

          </div>

          <Link
            to="/"
            className="btn btn-secondary"
          >
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PatientDetails;