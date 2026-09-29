import React from "react";

const FitnessAssessmentModal = ({ show, data, onClose }) => {
  if (!show || !data) return null;

  const getBadgeColor = (bmiCategory) => {
    switch (bmiCategory?.toLowerCase()) {
      case "underweight":
        return "info";

      case "normal":
        return "success";

      case "overweight":
        return "warning";

      case "obese":
        return "danger";

      default:
        return "secondary";
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="modal fade show"
        style={{
          display: "block",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content border-0 shadow">
            {/* HEADER */}
            <div className="modal-header">
              <h4 className="modal-title fw-bold">AI Fitness Coach</h4>

              <button type="button" className="btn-close" onClick={onClose} />
            </div>

            {/* BODY */}
            <div className="modal-body">
              {/* Hero Section */}
              <div className="card border-0 bg-light shadow-sm mb-4">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <small className="text-muted">FITNESS GOAL</small>

                      <h4 className="fw-bold text-success mt-2">
                        🎯 {data.fitness_goal}
                      </h4>
                    </div>

                    <div className="col-md-6 mt-3 mt-md-0">
                      <small className="text-muted">ACTIVITY TARGET</small>

                      <h4 className="fw-bold text-primary mt-2">
                        ⏱️ {data.activity_target}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommendation Cards */}
              <div className="row g-4">
                {/* Exercise Plan */}
                <div className="col-lg-6">
                  <div className="card h-100 border-primary shadow-sm">
                    <div className="card-header bg-primary text-white fw-bold">
                      🏋️ Exercise Plan
                    </div>

                    <div className="card-body">
                      <ul className="list-group list-group-flush">
                        {data.exercise_plan?.map((item, index) => (
                          <li
                            key={index}
                            className="list-group-item border-0 px-0"
                          >
                            ✅ {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Nutrition Plan */}
                <div className="col-lg-6">
                  <div className="card h-100 border-success shadow-sm">
                    <div className="card-header bg-success text-white fw-bold">
                      🥗 Nutrition Plan
                    </div>

                    <div className="card-body">
                      <ul className="list-group list-group-flush">
                        {data.nutrition_plan?.map((item, index) => (
                          <li
                            key={index}
                            className="list-group-item border-0 px-0"
                          >
                            🍎 {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Lifestyle Recommendations */}
                <div className="col-lg-6">
                  <div className="card h-100 border-info shadow-sm">
                    <div className="card-header bg-info text-white fw-bold">
                      🌱 Lifestyle Recommendations
                    </div>

                    <div className="card-body">
                      <ul className="list-group list-group-flush">
                        {data.lifestyle_recommendations?.map((item, index) => (
                          <li
                            key={index}
                            className="list-group-item border-0 px-0"
                          >
                            ⭐ {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Precautions */}
                <div className="col-lg-6">
                  <div className="card h-100 border-warning shadow-sm">
                    <div className="card-header bg-warning fw-bold">
                      ⚠️ Precautions
                    </div>

                    <div className="card-body">
                      <ul className="list-group list-group-flush">
                        {data.precautions?.map((item, index) => (
                          <li
                            key={index}
                            className="list-group-item border-0 px-0"
                          >
                            🔶 {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Important Note */}
              <div className="alert alert-secondary mt-4 mb-0">
                <div className="fw-bold mb-2">📋 Important Note</div>

                <div>{data.important_note}</div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="modal-footer">
              <button className="btn btn-outline-secondary" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FitnessAssessmentModal;
