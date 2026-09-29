import { BrowserRouter, Routes, Route } from "react-router-dom";
import PatientList from "./components/PatientList"
import PatientForm from "./components/PatientForm";
import PatientDetails from "./components/PatientDetails";

function App() {
  return (
    <BrowserRouter>
      <div className="container mt-4">

        <div className="card shadow">
          <div className="card-header bg-primary text-white">
            <h2>PMS - Patient Management System</h2>
          </div>

          <div className="card-body">
            <Routes>
              <Route path="/" element={<PatientList />} />
              <Route path="/add" element={<PatientForm />} />
              <Route path="/edit/:id" element={<PatientForm />} />
              <Route path="/patient/:id" element={<PatientDetails />} />
            </Routes>
          </div>
        </div>

      </div>
    </BrowserRouter>
  );
}

export default App;