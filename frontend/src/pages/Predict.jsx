import React, { useState } from "react";
import { predictReadmission } from "../api";

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await predictReadmission(formData);
    setResult(result);

    if (!result.error) {
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
  };

  return (
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
                type="number"
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

        {result && (
          <div className="mt-6 p-4 bg-gray-50 border rounded-md">
            {result.error ? (
              <p className="text-red-600 font-medium">Error: {result.error}</p>
            ) : (
              <>
                <h3 className="text-lg font-semibold text-gray-800">
                  Prediction Result:
                </h3>
                <p>
                  Readmission:{" "}
                  <span className="font-medium">
                    {result.readmission === 1 ? "Yes" : "No"}
                  </span>
                </p>
                <p>
                  Probability:{" "}
                  <span className="font-medium">
                    {(result.probability * 100).toFixed(2)}%
                  </span>
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PredictorForm;
