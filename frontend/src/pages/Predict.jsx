import React, { useState } from "react";
import { predictReadmission } from "../api";
import Header from '../components/header';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PredictorForm = () => {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    primary_diagnosis: "",
    discharge_to: "",
    num_procedures: "",
    days_in_hospital: "",
    comorbidity_score: "",
  });

  const [result, setResult] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(""); // New state for rating

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await predictReadmission(formData);
    setResult(result);
    setShowModal(true);

    if (!result.error) {
      const historyEntry = {
        ...formData,
        readmission: result?.readmission === 1 ? "Yes" : "No",
        probability: `${(result?.probability * 100).toFixed(2)}%`,
      };

      await fetch("http://localhost:5000/api/patient/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(historyEntry),
      });
    }
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

    // Send feedback to the backend
    await fetch("http://localhost:5000/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(feedbackData),
    });

    // Clear feedback and rating after submission
    setFeedback("");
    setRating("");
    alert("Feedback submitted successfully!");
  };

  const chartData = {
    labels: ["Readmitted", "Not Readmitted"],
    datasets: [
      {
        data: [
          result?.readmission === 1 ? result?.probability * 100 : 100 - result?.probability * 100,
          result?.readmission === 0 ? result?.probability * 100 : 100 - result?.probability * 100
        ],
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverBackgroundColor: ["#FF4384", "#2A91D3"],
      },
    ],
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
            Readmission Predictor
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {Object.keys(formData).map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700">
                  {field.replace("_", " ").toUpperCase()}
                </label>
                <input
                  type={field === "gender" ? "text" : "number"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-200"
                />
              </div>
            ))}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
            >
              Predict
            </button>
          </form>
        </div>
      </div>

      {/* Modal for showing result */}
      {showModal && result && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-lg">
            <h3 className="text-lg font-semibold text-center text-gray-800">
              Prediction Result
            </h3>

            {/* Pie Chart with Probability in Center */}
            <div className="flex justify-center mt-4 relative">
              <div className="w-48 h-48">
                <Pie data={chartData} options={{
                  plugins: {
                    tooltip: { enabled: false },
                    legend: { display: true },
                  }
                }} />
              </div>
              <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-gray-800">
                {(result?.probability * 100).toFixed(2)}%
              </div>
            </div>

            <p className="mt-4 text-center">
              Readmission:{" "}
              <span className="font-medium">
                {result?.readmission === 1 ? "Yes" : "No"}
              </span>
            </p>

            {/* Rating System with Percentage Emojis */}
            <div className="mt-4 text-center">
              <h4 className="font-medium text-gray-700">Rate our Prediction</h4>
              <div className="flex justify-center space-x-2">
                {['😡 Very Bad', '😞 Bad', '😐 Neutral', '😊 Good', '😀 Excellent'].map((emoji, index) => (
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

            {/* Feedback Input */}
            <div className="mt-4">
              <h4 className="font-medium text-gray-700 text-center">Your Feedback:</h4>
              <input
                type="text"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full mt-2 p-2 border rounded-md focus:ring focus:ring-blue-200"
                placeholder="Write your feedback here..."
              />
              <button
                onClick={handleFeedbackSubmit}
                className="mt-2 w-full py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition"
              >
                Submit Feedback
              </button>
            </div>

            {/* Close Button */}
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
