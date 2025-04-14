import React, { useState, useEffect } from "react";
import { predictReadmission } from "../api";
import Header from "../components/header";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PredictorForm = () => {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",             // No default value
    primary_diagnosis: "",  // No default value
    discharge_to: "",       // No default value
    num_procedures: "",
    days_in_hospital: "",
    comorbidity_score: "",
  });

  const [result, setResult] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState("");
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");

  const primaryDiagnoses = [
    "COPD",               // 0
    "Diabetes",           // 1
    "Heart disease",      // 2
    "Hypertension",       // 3
    "Kidney disease"      // 4
  ];

  const dischargeOptions = [
    "Home",                             // 0
    "Home health care",                 // 1
    "Rehabilitation facility",          // 2
    "Skilled nursing facility"           // 3
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

// Inside your handleSubmit function, update the historyEntry creation:

const handleSubmit = async (e) => {
  e.preventDefault();

  const preparedData = {
    ...formData,
    gender: formData.gender === "Male" ? 1 : 0,
  };

  const result = await predictReadmission(preparedData);
  setResult(result);
  setShowModal(true);

  if (!result.error) {
    // Get text values for diagnosis and discharge
    const diagnosisText = primaryDiagnoses[parseInt(formData.primary_diagnosis)];
    const dischargeText = dischargeOptions[parseInt(formData.discharge_to)];
    
    // Create history entry with all required fields
    const historyEntry = {
      age: formData.age,
      gender: formData.gender, // Keep as "Male" or "Female" for display
      primary_diagnosis: formData.primary_diagnosis, // Send index, backend will convert
      discharge_to: formData.discharge_to, // Send index, backend will convert
      num_procedures: formData.num_procedures, // Will be mapped to procedures
      days_in_hospital: formData.days_in_hospital,
      comorbidity_score: formData.comorbidity_score, // Will be mapped to comorbidity
      readmission: result?.readmission === 1 ? "Yes" : "No",
      probability: `${(result?.probability * 100).toFixed(2)}%`,
    };

    try {
      const response = await fetch("http://localhost:5000/api/patient/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(historyEntry),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error saving history:", errorData);
      }
    } catch (error) {
      console.error("Error saving history:", error);
    }
  }

  // Reset form data after submission
  setFormData({
    age: "",
    gender: "",
    primary_diagnosis: "",
    discharge_to: "",
    num_procedures: "",
    days_in_hospital: "",
    comorbidity_score: "",
  });
};

  const handleRatingClick = (emoji) => {
    setRating(emoji);
  };

  const handleFeedbackSubmit = async () => {
    if (!feedback || !rating) {
      alert("Please provide both feedback and a rating.");
      return;
    }

    const feedbackData = {
      feedback,
      rating,
      timestamp: new Date(),
    };

    await fetch("http://localhost:5000/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(feedbackData),
    });

    setFeedback("");
    setRating("");
    alert("Feedback submitted successfully!");
  };

  const chartData = {
    labels: ["Readmitted", "Not Readmitted"],
    datasets: [
      {
        data: [
          result?.readmission === 1
            ? result?.probability * 100
            : 100 - result?.probability * 100,
          result?.readmission === 0
            ? result?.probability * 100
            : 100 - result?.probability * 100,
        ],
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverBackgroundColor: ["#FF4384", "#2A91D3"],
      },
    ],
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("bg-gray-900", "text-white");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("bg-gray-900", "text-white");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className={`min-h-screen flex items-center justify-center p-6 ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
        <div className={`w-full max-w-lg shadow-md rounded-lg p-8 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
          <h2 className={`text-2xl font-bold mb-6 text-center ${darkMode ? "text-white" : "text-gray-700"}`}>
            Readmission Predictor
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {Object.keys(formData).map((field) => (
              <div key={field}>
                <label className={`block text-sm font-medium ${darkMode ? "text-white" : "text-gray-700"}`}>
                  {field.replace("_", " ").toUpperCase()}
                </label>
                {field === "gender" ? (
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    className={`w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-200 ${darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"}`}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                ) : field === "primary_diagnosis" ? (
                  <select
                    name="primary_diagnosis"
                    value={formData.primary_diagnosis}
                    onChange={handleChange}
                    required
                    className={`w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-200 ${darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"}`}
                  >
                    <option value="">Select Diagnosis</option>
                    {primaryDiagnoses.map((diagnosis, index) => (
                      <option key={index} value={index}>
                        {diagnosis}
                      </option>
                    ))}
                  </select>
                ) : field === "discharge_to" ? (
                  <select
                    name="discharge_to"
                    value={formData.discharge_to}
                    onChange={handleChange}
                    required
                    className={`w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-200 ${darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"}`}
                  >
                    <option value="">Select Discharge Option</option>
                    {dischargeOptions.map((option, index) => (
                      <option key={index} value={index}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="number"
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    required
                    className={`w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-200 ${darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"}`}
                  />
                )}
              </div>
            ))}
            <button
              type="submit"
              className={`w-full py-2 px-4 font-semibold rounded-md hover:bg-blue-700 transition ${darkMode ? "bg-blue-600 text-white" : "bg-blue-600 text-white"}`}
            >
              Predict
            </button>
          </form>
        </div>
      </div>

      {/* Modal for showing result */}
      {showModal && result && (
        <div className={`fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
          <div className={`bg-white rounded-lg p-6 shadow-lg w-full max-w-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}>
            <h3 className={`text-lg font-semibold text-center ${darkMode ? "text-white" : "text-gray-800"}`}>
              Prediction Result
            </h3>

            <div className="flex justify-center mt-4 relative">
              <div className="w-48 h-48">
                <Pie
                  data={chartData}
                  options={{
                    plugins: {
                      tooltip: { enabled: false },
                      legend: { display: true },
                    },
                  }}
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-gray-800">
                {(result?.probability * 100).toFixed(2)}%
              </div>
            </div>

            <p className={`mt-4 text-center ${darkMode ? "text-white" : "text-gray-700"}`}>
              Readmission:{" "}
              <span className="font-medium">
                {result?.readmission === 1 ? "Yes" : "No"}
              </span>
            </p>

            <div className="mt-4 text-center">
              <h4 className={`font-medium ${darkMode ? "text-white" : "text-gray-700"}`}>
                Rate our Prediction
              </h4>
              <div className="flex justify-center space-x-2">
                {[
                  "😡 Very Bad",
                  "😞 Bad",
                  "😐 Neutral",
                  "😊 Good",
                  "😀 Excellent",
                ].map((emoji, index) => (
                  <button
                    key={index}
                    className="text-2xl p-2 shadow-lg hover:shadow-xl hover:bg-gray-100 transition-all duration-200 ease-in-out round-xl"
                    onClick={() => handleRatingClick(emoji)}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <h4 className={`font-medium ${darkMode ? "text-white" : "text-gray-700"} text-center`}>
                Your Feedback:
              </h4>
              <input
                type="text"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className={`w-full mt-2 p-2 border rounded-md focus:ring focus:ring-blue-200 ${darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"}`}
                placeholder="Write your feedback here..."
              />
              <button
                onClick={handleFeedbackSubmit}
                className={`mt-2 w-full py-2 font-semibold rounded-md hover:bg-green-700 transition ${darkMode ? "bg-green-600 text-white" : "bg-green-600 text-white"}`}
              >
                Submit Feedback
              </button>
            </div>

            <div className="mt-4 text-center">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PredictorForm;