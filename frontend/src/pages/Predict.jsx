import React, { useState } from "react";
import { predictReadmission } from "../api";
import Header from '../components/header';
import { Pie } from 'react-chartjs-2'; // To display the pie chart
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the required chart.js components
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
    patient_notes: "", // Add patient notes field
  });

  const [result, setResult] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await predictReadmission(formData);
    setResult(result);
    setShowModal(true);  // Show the modal after prediction

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

  // Pie chart data with optional chaining
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
              field !== "patient_notes" && (  // Avoid rendering textarea for patient_notes
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700">
                    {field.replace("_", " ").toUpperCase()}
                  </label>
                  <input
                    type="number"
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    required
                    className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-200"
                  />
                </div>
              )
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
          <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-lg h-auto"> {/* Set width and height to match form */}
            <h3 className="text-lg font-semibold text-center text-gray-800">
              Prediction Result
            </h3>
            <div className="flex justify-center mt-4">
              <Pie data={chartData} />
            </div>
            <p className="mt-4 text-center">
              Readmission:{" "}
              <span className="font-medium">
                {result?.readmission === 1 ? "Yes" : "No"}
              </span>
            </p>
            <p className="text-center">
              Probability:{" "}
              <span className="font-medium">
                {(result?.probability * 100).toFixed(2)}%
              </span>
            </p>

            {/* Emoji Rating */}
            <div className="mt-4 text-center">
              <h4 className="font-medium text-gray-700">Rate our Prediction</h4>
              <div className="flex justify-center space-x-2">
                {['😀', '😊', '😐', '😞', '😡'].map((emoji, index) => (
                  <button key={index} className="text-2xl">{emoji}</button>
                ))}
              </div>
            </div>

            <div className="mt-4 text-center">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded-md"
              >
                Close
              </button>
            </div>

            {/* Textarea for Patient Notes (editable field added below Close button) */}
            <div className="mt-4">
              <h4 className="font-medium text-gray-700 text-center">Your Notes:</h4>
              <textarea
                className="w-full mt-2 p-2 border rounded-md focus:ring focus:ring-blue-200"
                name="patient_notes"
                value={formData.patient_notes} // Allow user input for notes
                onChange={handleChange} // Update formData when the user types
                rows="4"
                placeholder="Write your comments here..."
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PredictorForm;
