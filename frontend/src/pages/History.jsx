import React, { useEffect, useState } from "react";

const History = () => {
  const [patientHistory, setPatientHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const response = await fetch("http://localhost:5000/api/patient/history");
      const data = await response.json();
      setPatientHistory(data);
    };
    fetchHistory();
  }, []);

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:5000/api/patient/history/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      // Remove the deleted entry from the state
      setPatientHistory(patientHistory.filter((patient) => patient._id !== id));
    } else {
      const data = await response.json();
      alert(data.error || "Error deleting the record");
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center text-teal-600 mb-6">
        Patient History
      </h2>

      {patientHistory.length === 0 ? (
        <p className="text-center text-gray-600">No history available.</p>
      ) : (
        <table className="w-full border-collapse border border-teal-600">
          <thead>
            <tr className="bg-teal-600 text-white">
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Age</th>
              <th className="p-2 border">Gender</th>
              <th className="p-2 border">Primary Diagnosis</th>
              <th className="p-2 border">Discharge To</th>
              <th className="p-2 border">Procedures</th>
              <th className="p-2 border">Days in Hospital</th>
              <th className="p-2 border">Comorbidity</th>
              <th className="p-2 border">Readmission</th>
              <th className="p-2 border">Probability</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {patientHistory.map((patient) => (
              <tr key={patient._id} className="text-center">
                <td className="p-2 border">{patient.date}</td>
                <td className="p-2 border">{patient.age}</td>
                <td className="p-2 border">{patient.gender}</td>
                <td className="p-2 border">{patient.primary_diagnosis}</td>
                <td className="p-2 border">{patient.discharge_to}</td>
                <td className="p-2 border">{patient.num_procedures}</td>
                <td className="p-2 border">{patient.days_in_hospital}</td>
                <td className="p-2 border">{patient.comorbidity_score}</td>
                <td className="p-2 border">{patient.readmission}</td>
                <td className="p-2 border">{patient.probability}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => handleDelete(patient._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default History;
