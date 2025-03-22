import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import Header from "../components/header";

const History = () => {
  const [patientHistory, setPatientHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");

  useEffect(() => {
    const fetchHistory = async () => {
      const response = await fetch("http://localhost:5000/api/patient/history");
      const data = await response.json();
      setPatientHistory(data);
    };
    fetchHistory();
  }, []);

  const exportToExcel = () => {
    if (patientHistory.length === 0) {
      alert("No data available to export.");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(patientHistory);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Patient History");

    XLSX.writeFile(workbook, "Patient_History.xlsx");
  };

  return (
    <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} min-h-screen`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="max-w-6xl mx-auto mt-10 p-6 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6">
          Patient History
        </h2>

        <div className="flex justify-end mb-4">
          <button 
            onClick={exportToExcel} 
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Export to Excel
          </button>
        </div>

        {patientHistory.length === 0 ? (
          <p className="text-center">No history available.</p>
        ) : (
          <table className="w-full border-collapse border">
            <thead>
              <tr className={`${darkMode ? 'bg-blue-700' : 'bg-blue-700'} text-white`}>
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
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default History;
