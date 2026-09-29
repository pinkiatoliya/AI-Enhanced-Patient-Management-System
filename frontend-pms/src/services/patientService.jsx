import axios from "axios";

const API = "http://127.0.0.1:8000";

export const getPatients = () =>
  axios.get(`${API}/patient/view`);

export const getPatientById = (id) =>
  axios.get(`${API}/patient/view/${id}`);

export const createPatient = (data) =>
  axios.post(`${API}/patient/create`, data);

export const updatePatient = (id, data) =>
  axios.put(`${API}/patient/edit/${id}`, data);

export const sortPatients = (sort_by, order) =>
  axios.get(`${API}/patient/sort?sort_by=${sort_by}&order=${order}`);

export const askGenAI = (question) =>
  axios.post(`${API}/ai/ask`, question);

export const riskAssessmentAPI = (data) => axios.post(`${API}/ai/risk_assessment`, data)
export const fitnessAIAPICall = (data)=> axios.post(`${API}/ai/fitness_adviser`, data)
