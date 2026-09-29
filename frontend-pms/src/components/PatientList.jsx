import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./createLoader.css";
import {
  getPatients,
  sortPatients,
  askGenAI,
  riskAssessmentAPI,
  fitnessAIAPICall
} from "../services/patientService";
import PatientRiskAssessmentModal from "./PatientRiskAssessmentModal";
import FitnessAssessmentModal from "./FitnessAssessmentModal";
// const assessment = {
// risk_level: "Moderate",
// risk_reason:
// "Patient has elevated blood pressure and a family history of cardiovascular disease.",
// risk_factors: [
// "Elevated blood pressure",
// "Family history of heart disease",
// "Sedentary lifestyle",
// ],
// preventive_actions: [
// "Monitor blood pressure weekly",
// "Increase physical activity",
// "Schedule follow-up consultation",
// ],
// };


function PatientList() {
  const [patients, setPatients] = useState([]);
  const [showRiskModal, setShowRiskModal] = useState(false);
  const [showSortModal, setShowSortModal] = useState(false);
  const [showFitnessModal, setShowFitnessModal] = useState(false);
  const [showExpertModal, setShowExpertModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [AIAdvice, setAIAdvice] = useState({});
  const [AIassessment, setAIAssessment] = useState({});
  const [AIFitnessData, setAIFitnessData] = useState({});
  const [sortForm, setSortForm] = useState({
    sort_by: "height",
    order: "asc",
  });

  const options_sort = ["height", "weight", "bmi"];
  const options_order = ["asc", "desc"];

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    try {
      const response = await getPatients();

      const patientList = Object.entries(response.data).map(
        ([id, patient]) => ({
          id,
          ...patient,
        }),
      );

      setPatients(patientList);
    } catch (error) {
      console.error("Error loading patients:", error);
    }
  };

  const handleSortChange = (e) => {
    setSortForm({
      ...sortForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSortSubmit = async () => {
    try {
      const response = await sortPatients(sortForm.sort_by, sortForm.order);
      // const sortedPatients = Object.entries(response.data).map(
      //   ([id, patient]) => ({
      //     id,
      //     ...patient,
      //   })
      // );
      setTimeout(() => {
        setShowSortModal(false);
        console.log(response?.data, "response");

        setPatients(response?.data);
      }, 1000);
    } catch (error) {
      console.error("Sort Error:", error);
    }
  };

  const askExpert = async (patient) => {
    setIsLoading(true);
    const data = {
      weight: patient.weight,
      height: patient.height,
      age: patient.age,
      bmi: patient.bmi,
    };
    const response = await askGenAI(data);
    setIsLoading(false);

    console.log(response);
    setAIAdvice(response?.data?.answer);
    setShowExpertModal(true);
  };

  const riskAssessment = async (patient) => {
    setIsLoading(true);
    const data = {
      weight: patient.weight,
      height: patient.height,
      age: patient.age,
      bmi: patient.bmi,
    };
    const response = await riskAssessmentAPI(data);
    console.log(response);
    setIsLoading(false);
    setAIAssessment(response?.data?.answer);
    setShowRiskModal(true);
  };

  const fitnessAssessment = async (patient) => {
    setIsLoading(true);
    const { weight, height, bmi, age } = patient;
    const data = {weight, height, bmi, age};
    const response = await fitnessAIAPICall(data);
    console.log(response);
    setIsLoading(false);
    setAIFitnessData(response?.data?.answer);
    setShowFitnessModal(true);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Patient Management System</h3>

        <div>
          <button
            className="btn btn-primary me-2"
            onClick={() => setShowSortModal(true)}
          >
            Sort Patients
          </button>

          <Link to="/add" className="btn btn-success">
            Add Patient
          </Link>
        </div>
      </div>

      <table className="table table-bordered table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>City</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Height</th>
            <th>Weight</th>
            <th>BMI</th>
            <th>Verdict</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {patients?.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.id}</td>
              <td>{patient.name}</td>
              <td>{patient.city}</td>
              <td>{patient.age}</td>
              <td>{patient.gender}</td>
              <td>{patient.height}</td>
              <td>{patient.weight}</td>
              <td>{patient.bmi}</td>
              <td>
                <span
                  className={`badge ${
                    patient.verdict === "Normal"
                      ? "bg-success"
                      : patient.verdict === "Underweight"
                        ? "bg-warning text-dark"
                        : "bg-danger"
                  }`}
                >
                  {patient.verdict}
                </span>
              </td>

              <td>
                <Link
                  to={`/patient/${patient.id}`}
                  className="btn btn-info btn-sm me-2"
                >
                  View
                </Link>
                <Link
                  to={`/edit/${patient.id}`}
                  className="btn btn-warning btn-sm"
                >
                  Edit
                </Link>{" "}
                {!isLoading && (
                  <Link
                    onClick={() => askExpert(patient)}
                    className="btn btn-success btn-sm"
                  >
                    BMI Analysis 🤖
                  </Link>
                )}{" "}
                {!isLoading && (
                  <Link
                    onClick={() => riskAssessment(patient)}
                    className="btn btn-success btn-sm"
                  >
                    Risk Assessment 🛡️
                  </Link>
                )}
                {" "}
                {!isLoading && (
                  <Link
                    onClick={() => fitnessAssessment(patient)}
                    className="btn btn-success btn-sm"
                  >
                    Fitness Adviser 🏋️
                  </Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* SORT MODAL */}
      {showSortModal && (
        <>
          <div
            className="modal fade show"
            style={{ display: "block" }}
            tabIndex="-1"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Sort Patients</h5>

                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowSortModal(false)}
                  ></button>
                </div>

                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Choose Sort Parameter</label>

                    <select
                      className="form-select"
                      name="sort_by"
                      value={sortForm.sort_by}
                      onChange={handleSortChange}
                    >
                      <option value="height">Height</option>
                      <option value="weight">Weight</option>
                      <option value="bmi">BMI</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Choose Order</label>

                    <select
                      className="form-select"
                      name="order"
                      value={sortForm.order}
                      onChange={handleSortChange}
                    >
                      <option value="asc">Ascending</option>
                      <option value="desc">Descending</option>
                    </select>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setShowSortModal(false)}
                  >
                    Cancel
                  </button>

                  <button
                    className="btn btn-primary"
                    onClick={handleSortSubmit}
                  >
                    Apply Sort
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-backdrop fade show"></div>
        </>
      )}
      {/* view advise */}
      {showExpertModal ? (
        <>
          <>
            <div
              className="modal fade show modal-xl"
              style={{ display: "block" }}
              tabIndex="-1"
            >
              <div className="modal-dialog modal-dialog-scrollable">
                <div className="modal-content">
                  <div className="modal-header bg-dark text-white">
                    <h5 className="modal-title">🤖 AI Health Adviser</h5>
                    <button
                      type="button"
                      className="btn-close btn-close-white"
                      onClick={() => setShowExpertModal(false)}
                    />
                  </div>

                  <div className="modal-body">
                    {AIAdvice && (
                      <>
                        <div className="card border-primary mb-3">
                          <div className="card-header bg-primary text-white">
                            📊 BMI Analysis
                          </div>
                          <div className="card-body">
                            {AIAdvice.bmi_analysis}
                          </div>
                        </div>

                        <div className="alert alert-warning">
                          <h6>⚠️ Potential Health Risks</h6>
                          <p className="mb-0">{AIAdvice.health_risk}</p>
                        </div>

                        <div className="card mb-3">
                          <div className="card-header bg-success text-white">
                            ✅ Recommendations
                          </div>

                          <ul className="list-group list-group-flush">
                            {AIAdvice.recommendations?.map((rec, idx) => (
                              <li
                                key={idx}
                                className="list-group-item d-flex align-items-center"
                              >
                                <span className="badge bg-success rounded-pill me-3">
                                  {idx + 1}
                                </span>
                                {rec}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="alert alert-info">
                          <h6>ℹ️ Disclaimer</h6>
                          <p className="mb-0">{AIAdvice.disclaimer}</p>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="modal-footer">
                    <button
                      className="btn btn-secondary"
                      onClick={() => setShowExpertModal(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-backdrop fade show"></div>
          </>
        </>
      ) : (
        isLoading && (
          <div className="ai-loader">
            <span></span>
            <span></span>
            <span></span>
            <div className="ai-text">AI is thinking...</div>
          </div>
        )
      )}
      <PatientRiskAssessmentModal
        show={showRiskModal}
        onClose={() => setShowRiskModal(false)}
        assessment={AIassessment}
      />
      <FitnessAssessmentModal
        show={showFitnessModal}
        data={AIFitnessData}
        onClose={() => setShowFitnessModal(false)}
      />
    </div>
  );
}
export default PatientList;
