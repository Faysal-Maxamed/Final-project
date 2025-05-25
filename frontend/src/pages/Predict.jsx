import React, { useState, useEffect } from "react";
import { predictReadmission } from "../api";
import Header from "../components/header";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PredictorForm = () => {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    primary_diagnosis: "",
    num_procedures: "",
    days_in_hospital: "",
  });

  const [result, setResult] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState("");
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");

  const primaryDiagnoses = [
    "Depressed Skull Fracture",
    "Abdominal Injury",
    "Open Femur Fracture",
    "Multiple Injury",
    "Diabetic Foot Gangrene",
    "Left Hand Fingers Injury",
    "Right Wrist Injury",
    "Left Toe Infected Wound",
    "Soft Tissue Injury Right Ankle Fracture",
    "Left Ankle Joint"
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const preparedData = {
      Age: Number(formData.age),
      Gender: formData.gender === "Male" ? 1 : 0,
      Primary_Diagnosis: Number(formData.primary_diagnosis),
      'Number of Procedures': Number(formData.num_procedures),
      'Days in Hospital': Number(formData.days_in_hospital),
    };

    try {
      const result = await predictReadmission(preparedData);
      setResult(result);
      setShowModal(true);

      if (result && !result.error) {
        const historyEntry = {
          ...formData,
          readmission: result.readmission === 1 ? "Yes" : "No",
          probability: `${(result.probability * 100).toFixed(2)}%`,
        };

        await fetch("http://localhost:5000/api/patient/history", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(historyEntry),
        });
      }
    } catch (error) {
      console.error("Error making prediction:", error);
      alert("Prediction failed. Please try again.");
    }

    setFormData({
      age: "",
      gender: "",
      primary_diagnosis: "",
      num_procedures: "",
      days_in_hospital: "",
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
    alert("Feedback submitted. Thank you!");
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
                    className={`w-full mt-1 p-2 border rounded-md focus:ring ${darkMode ? "bg-gray-700 text-white" : "bg-white text-black"}`}
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
                    className={`w-full mt-1 p-2 border rounded-md focus:ring ${darkMode ? "bg-gray-700 text-white" : "bg-white text-black"}`}
                  >
                    <option value="">Select Diagnosis</option>
                    {primaryDiagnoses.map((diag, i) => (
                      <option key={i} value={i}>{diag}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="number"
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    required
                    className={`w-full mt-1 p-2 border rounded-md focus:ring ${darkMode ? "bg-gray-700 text-white" : "bg-white text-black"}`}
                  />
                )}
              </div>
            ))}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
            >
              Predict
            </button>
          </form>
        </div>
      </div>

      {/* Modal */}
      {showModal && result && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`p-6 rounded-lg w-full max-w-lg ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
            <h2 className="text-xl font-bold mb-4 text-center">Prediction Result</h2>
            <div className="flex justify-center mt-4 relative">
              <div className="w-48 h-48">
                <Pie data={chartData} options={{ plugins: { legend: { display: true } } }} />
              </div>
              <div className="absolute inset-0 flex items-center justify-center font-bold text-lg">
                {(result.probability * 100).toFixed(2)}%
              </div>
            </div>
            <p className="text-center mt-4">
              Readmission: <strong>{result.readmission === 1 ? "Yes" : "No"}</strong>
            </p>

            <div className="mt-4 text-center">
              <h4>Rate our Prediction</h4>
              <div className="flex justify-center space-x-2 mt-2">
                {["😡", "😞", "😐", "😊", "😀"].map((emoji, i) => (
                  <button key={i} onClick={() => handleRatingClick(emoji)} className="text-2xl">
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows="4"
                placeholder="Write your feedback here..."
                className="w-full p-2 border rounded-md"
              />
              <button
                onClick={handleFeedbackSubmit}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Submit Feedback
              </button>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
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
