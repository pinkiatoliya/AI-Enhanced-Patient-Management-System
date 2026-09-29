import React from "react";

const PatientRiskAssessmentModal = ({
  show,
  assessment,
  onClose
}) => {
  const getRiskConfig = (level = "") => {
    switch (level.toLowerCase()) {
      case "high":
        return {
          color: "danger",
          icon: "🔴",
          title: "HIGH RISK"
        };
      case "moderate":
        return {
          color: "primary",
          icon: "🔵",
          title: "MODERATE RISK"
        };
      case "low":
        return {
          color: "success",
          icon: "🟢",
          title: "LOW RISK"
        };
      default:
        return {
          color: "secondary",
          icon: "⚪",
          title: "UNKNOWN"
        };
    }
  };

  const risk = getRiskConfig(assessment?.risk_level);

  return (
    <>
      {show && <div 
        className="modal fade show d-block"
        tabIndex="-1"
        style={{ backgroundColor: "rgba(0,0,0,.5)" }}
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">

            {/* Header */}
            <div className="modal-header">
              <h5 className="modal-title fw-bold">
                Patient Risk Assessment
              </h5>

              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              />
            </div>

            {/* Body */}
            <div className="modal-body">

              {/* Risk Banner */}
              <div
                className={`card border-${risk.color} border-2 mb-4`}
              >
                <div className="card-body text-center py-4">

                  <div
                    className="mb-2"
                    style={{ fontSize: "3rem" }}
                  >
                    {risk.icon}
                  </div>

                  <span
                    className={`badge bg-${risk.color} px-4 py-2 fs-6`}
                  >
                    {risk.title}
                  </span>
                </div>
              </div>

              {/* Risk Reason */}
              <div className="mb-4">
                <h6 className="fw-bold mb-2">
                  Why was this risk assigned?
                </h6>

                <div
                  className={`alert alert-${risk.color} mb-0`}
                >
                  {assessment?.risk_reason}
                </div>
              </div>

              {/* Two Column Layout */}
              <div className="row g-3">

                {/* Risk Factors */}
                <div className="col-md-6">
                  <div className="card h-100">

                    <div className="card-header bg-danger text-white">
                      <strong>Risk Factors</strong>
                    </div>

                    <div className="card-body">
                      {assessment?.risk_factors?.length ? (
                        <ul className="list-group list-group-flush">
                          {assessment.risk_factors.map(
                            (factor, index) => (
                              <li
                                key={index}
                                className="list-group-item border-0 px-0"
                              >
                                <span className="me-2">
                                  🔴
                                </span>
                                {factor}
                              </li>
                            )
                          )}
                        </ul>
                      ) : (
                        <p className="text-muted mb-0">
                          No risk factors identified.
                        </p>
                      )}
                    </div>

                  </div>
                </div>

                {/* Preventive Actions */}
                <div className="col-md-6">
                  <div className="card h-100">

                    <div className="card-header bg-success text-white">
                      <strong>Preventive Actions</strong>
                    </div>

                    <div className="card-body">
                      {assessment?.preventive_actions?.length ? (
                        <ul className="list-group list-group-flush">
                          {assessment.preventive_actions.map(
                            (action, index) => (
                              <li
                                key={index}
                                className="list-group-item border-0 px-0"
                              >
                                <span className="me-2">
                                  ✅
                                </span>
                                {action}
                              </li>
                            )
                          )}
                        </ul>
                      ) : (
                        <p className="text-muted mb-0">
                          No preventive actions available.
                        </p>
                      )}
                    </div>

                  </div>
                </div>

              </div>
            </div>

            {/* Footer */}
            <div className="modal-footer">
              <button
                className="btn btn-outline-secondary"
                onClick={onClose}
              >
                Close
              </button>
            </div>

          </div>
        </div>
      </div>}
    </>
  );
};

export default PatientRiskAssessmentModal;