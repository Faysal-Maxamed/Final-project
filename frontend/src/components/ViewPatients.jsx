import React, { useEffect, useState } from "react";
import Header from "../components/header";

const ViewPatients = ({ darkMode }) => {
  const [patients, setPatients] = useState([]);
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");

  useEffect(() => {
    const fetchPatients = async () => {
      const response = await fetch("http://localhost:5000/api/patient/view");
      const data = await response.json();
      setPatients(data);
    };
    fetchPatients();
  }, []);

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:5000/api/patient/view/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setPatients(patients.filter((patient) => patient._id !== id));
    } else {
      const data = await response.json();
      alert(data.error || "Error deleting the record");
    }
  };

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'} min-h-screen`}>
      <div className={`max-w-6xl mx-auto mt-10 p-6 shadow-lg rounded-lg ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <h2 className={`text-2xl font-bold text-center mb-6 ${darkMode ? 'text-blue-300' : ''}`}>Patient Records</h2>

        {patients.length === 0 ? (
          <p className={`text-center ${darkMode ? 'text-gray-300' : ''}`}>No patients found.</p>
        ) : (
          <table className={`w-full border-collapse border ${darkMode ? 'border-gray-700' : ''}`}>
            <thead>
              <tr className={`${darkMode ? 'bg-gray-800 text-gray-200' : 'bg-blue-700 text-white'}`}>
                <th className="p-2 border">Patient Name</th>
                <th className="p-2 border">Age</th>
                <th className="p-2 border">Gender</th>
                <th className="p-2 border">Diagnosis</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient._id} className={`text-center ${darkMode ? 'hover:bg-gray-800' : ''}`}>
                  <td className="p-2 border">{patient.name}</td>
                  <td className="p-2 border">{patient.age}</td>
                  <td className="p-2 border">{patient.gender}</td>
                  <td className="p-2 border">{patient.diagnosis}</td>
                  <td className="p-2 border">
                    <button
                      onClick={() => handleDelete(patient._id)}
                      className={`px-4 py-2 rounded-md ${darkMode ? 'bg-red-700 text-white hover:bg-red-800' : 'bg-red-600 text-white hover:bg-red-700'}`}
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
    </div>
  );
};

export default ViewPatients;