import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { MdMoreHoriz } from "react-icons/md";

const History = () => {
  const [patientHistory, setPatientHistory] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      const response = await fetch("http://localhost:5000/api/patient/history");
      const data = await response.json();
      const filteredData = data.map(({ __v, ...rest }) => rest);
      setPatientHistory(filteredData);
    };
    fetchHistory();
  }, []);

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:5000/api/patient/history/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      setPatientHistory(patientHistory.filter((patient) => patient._id !== id));
    } else {
      const data = await response.json();
      alert(data.error || "Error deleting the record");
    }
  };

  const exportToExcel = () => {
    if (patientHistory.length === 0) {
      alert("No data available to export.");
      return;
    }
    const cleanedData = patientHistory.map(({ _id, __v, ...rest }) => rest);
    const worksheet = XLSX.utils.json_to_sheet(cleanedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Patient History");
    XLSX.writeFile(workbook, "Patient_History.xlsx");
  };

  return (
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Order History</h2>
          <button
            onClick={exportToExcel}
            className="flex items-center gap-2 ml-auto bg-gradient-to-r from-blue-600 to-teal-500 hover:shadow-lg text-white px-4 py-1.5 text-sm rounded-md transition-all duration-200"
          >
            Export to Excel
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-700 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200">
              <tr>
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
                <th className="p-2 border text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {patientHistory.length === 0 ? (
                <tr>
                  <td colSpan="11" className="text-center py-4">
                    No history available.
                  </td>
                </tr>
              ) : (
                patientHistory.map((patient) => (
                  <tr
                    key={patient._id}
                    className="bg-white border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-2 border">{patient.date}</td>
                    <td className="p-2 border">{patient.age}</td>
                    <td className="p-2 border">{patient.gender}</td>
                    <td className="p-2 border">{patient.primary_diagnosis}</td>
                    <td className="p-2 border">{patient.discharge_to}</td>
                    <td className="p-2 border">{patient.procedures}</td>
                    <td className="p-2 border">{patient.days_in_hospital}</td>
                    <td className="p-2 border">{patient.comorbidity}</td>
                    <td className="p-2 border">
                      <span
                        className={`flex items-center text-sm ${patient.readmission === "Yes"
                            ? "text-red-500"
                            : "text-green-500"
                          }`}
                      >
                        ● {patient.readmission === "Yes" ? "Readmited" : "Not Readmited"}
                      </span>
                    </td>
                    <td className="p-2 border">{patient.probability}</td>
                    <td className="p-2 border text-right">
                      <button
                        onClick={() => handleDelete(patient._id)}
                        className="flex items-center gap-2 ml-auto bg-gradient-to-r from-blue-600 to-teal-500 hover:shadow-lg text-white px-4 py-1.5 text-sm rounded-md transition-all duration-200"
                      >
                        Delete
                      </button>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
  );
};

export default History;
