import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { motion } from "framer-motion";
import { 
  FaDownload, 
  FaTrash, 
  FaEye, 
  FaSearch, 
  FaFilter,
  FaCalendarAlt,
  FaUser,
  FaHospital,
  FaChartLine,
  FaExclamationTriangle,
  FaCheckCircle,
  FaTimes,
  FaSync
} from "react-icons/fa";
import Header from "./header";

const UserHistory = () => {
  const [patientHistory, setPatientHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Get userId from localStorage
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      fetchUserHistory();
    }
  }, [userId]);

  useEffect(() => {
    // Filter history based on search term and status
    let filtered = patientHistory;

    if (searchTerm) {
      filtered = filtered.filter(patient => 
        patient.primary_diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.gender.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.age.toString().includes(searchTerm) ||
        patient.readmission.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter(patient => patient.readmission === filterStatus);
    }

    setFilteredHistory(filtered);
  }, [patientHistory, searchTerm, filterStatus]);

  const fetchUserHistory = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:5000/api/patient/history");
      if (!response.ok) {
        throw new Error("Failed to fetch history");
      }
      const data = await response.json();
      
      // Filter data to only show records for the current user
      const userData = data.filter(record => record.userId === userId);
      const filteredData = userData.map(({ __v, ...rest }) => rest);
      setPatientHistory(filteredData);
    } catch (error) {
      console.error("Error fetching user history:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/patient/history/${deleteId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setPatientHistory(patientHistory.filter((patient) => patient._id !== deleteId));
        setShowDeleteModal(false);
        setDeleteId(null);
      } else {
        const data = await response.json();
        alert(data.error || "Error deleting the record");
      }
    } catch (error) {
      console.error("Error deleting record:", error);
      alert("Error deleting the record");
    }
  };

  const exportToExcel = () => {
    if (filteredHistory.length === 0) {
      alert("No data available to export.");
      return;
    }
    const cleanedData = filteredHistory.map(({ _id, __v, ...rest }) => rest);
    const worksheet = XLSX.utils.json_to_sheet(cleanedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "My Prediction History");
    XLSX.writeFile(workbook, "My_Prediction_History.xlsx");
  };

  const getStatusColor = (readmission) => {
    return readmission === "Yes" ? "text-red-500" : "text-green-500";
  };

  const getStatusIcon = (readmission) => {
    return readmission === "Yes" ? <FaExclamationTriangle /> : <FaCheckCircle />;
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
   <div>
    <Header />
    <div className="min-h-screen text-gray-900">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="max-w-7xl mx-auto"
      >
        {/* Header Section */}
        <div className=" p-6 ">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500">
                My Prediction History
              </h1>
              <p className="text-gray-600">
                View and manage all your hospital readmission predictions
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={fetchUserHistory}
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 bg-gray-500 text-white hover:bg-gray-600"
              >
                <FaSync />
                Refresh
              </button>
              <button
                onClick={exportToExcel}
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 bg-blue-500 text-white hover:bg-blue-600"
              >
                <FaDownload />
                Export Excel
              </button>
            </div>
          </div>
        </div>
        {/* Filters Section */}
        <div className="mb-6 p-4 rounded-xl bg-white shadow-lg">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search by diagnosis, gender, age..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 transition-all bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 transition-all bg-white border-gray-300 text-gray-900"
              >
                <option value="all">All Status</option>
                <option value="Yes">High Risk</option>
                <option value="No">Low Risk</option>
              </select>
            </div>
          </div>
        </div>
        {/* Table Section */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="rounded-2xl shadow-lg overflow-hidden bg-white"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt />
                      Date
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <FaUser />
                      Patient Info
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <FaHospital />
                      Diagnosis
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                    Hospital Stay
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                    Risk Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                    Probability
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredHistory.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <FaTimes className="text-4xl text-gray-400" />
                        <p className="text-lg text-gray-500">
                          {searchTerm || filterStatus !== "all" 
                            ? "No predictions match your filters" 
                            : "No prediction history available"
                          }
                        </p>
                        {(searchTerm || filterStatus !== "all") && (
                          <button
                            onClick={() => {
                              setSearchTerm("");
                              setFilterStatus("all");
                            }}
                            className="text-blue-500 hover:text-blue-600 font-medium"
                          >
                            Clear filters
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredHistory.map((patient, index) => (
                    <motion.tr
                      key={patient._id}
                      variants={fadeIn}
                      className="hover:bg-blue-50 transition-all duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(patient.date).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {patient.age} years, {patient.gender}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {patient.primary_diagnosis}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {patient.procedures} procedures
                        </div>
                        <div className="text-xs text-gray-500">
                          {patient.days_in_hospital} days
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs font-medium ${
                          patient.readmission === "Yes"
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }`}>
                          {getStatusIcon(patient.readmission)}
                          {patient.readmission === "Yes" ? "High Risk" : "Low Risk"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm font-medium ${getStatusColor(patient.readmission)}`}>
                          {patient.probability}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleDelete(patient._id)}
                          className="inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <FaTrash />
                          Delete
                        </button>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 rounded-2xl shadow-2xl max-w-md w-full mx-4 bg-white"
          >
            <div className="text-center">
              <FaExclamationTriangle className="text-4xl text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2 text-gray-900">
                Delete Prediction Record
              </h3>
              <p className="mb-6 text-gray-600">
                Are you sure you want to delete this prediction record? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 py-2 px-4 rounded-lg font-medium transition-all bg-gray-200 text-gray-800 hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 py-2 px-4 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
   </div>
  );
};

export default UserHistory;
