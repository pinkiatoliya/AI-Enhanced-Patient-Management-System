import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createPatient,
  updatePatient,
  getPatientById
} from "../services/patientService";

function PatientForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [patient, setPatient] = useState({
    id: "",
    name: "",
    city: "",
    age: "",
    gender: "Male",
    height: "",
    weight: ""
  });

  useEffect(() => {
    if (id) {
      loadPatient();
    }
  }, []);

  const loadPatient = async () => {
    const response = await getPatientById(id);
    setPatient(response.data);
  };

  const handleChange = (e) => {
    setPatient({
      ...patient,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (id) {
      await updatePatient(id, patient);
    } else {
      await createPatient(patient);
    }

    navigate("/");
  };

  return (
    <div>
      <h3>{id ? "Edit Patient" : "Create Patient"}</h3>

      <form onSubmit={handleSubmit}>
        <div className="row">

          <div className="col-md-6 mb-3">
            <label>Patient ID</label>
            <input
              type="text"
              name="id"
              className="form-control"
              value={patient.id}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label>Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={patient.name}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label>City</label>
            <input
              type="text"
              name="city"
              className="form-control"
              value={patient.city}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label>Age</label>
            <input
              type="number"
              name="age"
              className="form-control"
              value={patient.age}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label>Gender</label>
            <select
              name="gender"
              className="form-select"
              value={patient.gender}
              onChange={handleChange}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div className="col-md-6 mb-3">
            <label>Height (cm)</label>
            <input
              type="number"
              name="height"
              className="form-control"
              value={patient.height}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label>Weight (kg)</label>
            <input
              type="number"
              name="weight"
              className="form-control"
              value={patient.weight}
              onChange={handleChange}
            />
          </div>

        </div>

        <button
          type="submit"
          className="btn btn-primary"
        >
          {id ? "Update Patient" : "Create Patient"}
        </button>
      </form>
    </div>
  );
}

export default PatientForm;