import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaExclamationTriangle } from "react-icons/fa";

const PatientsList = ({ darkMode }) => {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Get current user info from localStorage
  const currentUserId = localStorage.getItem("userId");
  const currentUserRole = localStorage.getItem("role");

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/users");
        setPatients(res.data.filter(u => u.role === "patient"));
      } catch (err) {
        setPatients([]);
      }
    };
    fetchPatients();
  }, []);

  const showMsg = (msg, type = "success") => {
    setMessage(msg);
    setMessageType(type);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 2500);
  };

  const handleDeleteClick = (id) => {
    if (currentUserRole !== "admin") {
      showMsg("Only admins can delete patients.", "error");
      return;
    }
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/auth/deleteUser/${deleteId}`, {
        data: { adminId: currentUserId },
      });
      setPatients(patients.filter((user) => user._id !== deleteId));
      showMsg("Patient deleted successfully.", "success");
    } catch (err) {
      showMsg(err.response?.data?.error || "Failed to delete patient.", "error");
    } finally {
      setShowDeleteModal(false);
      setDeleteId(null);
    }
  };

  const filtered = patients.filter(
    u =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const totalRows = filtered.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const paginated = filtered.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  };

  return (
    <div className={`py-8 px-4 ${darkMode ? 'bg-gray-900 text-white' : ''}`}>
      {/* Message Box */}
      {showMessage && (
        <div className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-xl shadow-lg text-white font-semibold transition-all duration-300 ${messageType === "success" ? "bg-green-500" : "bg-red-500"}`}>
          {message}
        </div>
      )}
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`p-6 rounded-2xl shadow-2xl max-w-md w-full mx-4 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
            <div className="text-center">
              <FaExclamationTriangle className="text-4xl text-red-500 mx-auto mb-4" />
              <h3 className={`text-lg font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Delete Patient</h3>
              <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Are you sure you want to delete this patient? This action cannot be undone.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${darkMode ? 'bg-gray-800 text-gray-200 hover:bg-gray-700' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
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
          </div>
        </div>
      )}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <h2 className={`text-2xl font-bold ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>Patients</h2>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Search patients..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className={`p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 ${darkMode ? 'border-gray-700 bg-gray-800 text-gray-100 placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900 placeholder-gray-400'}`}
          />
          <label className={`ml-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Show
            <select
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
              className={`mx-2 p-1 border rounded ${darkMode ? 'border-gray-700 bg-gray-800 text-gray-100' : 'border-gray-300 bg-white text-gray-900'}`}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            entries
          </label>
        </div>
      </div>
      <div className={`overflow-x-auto rounded-xl shadow-lg ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <table className={`min-w-full divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
          <thead className={darkMode ? 'bg-gray-800' : 'bg-gray-50'}>
            <tr>
              <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Avatar</th>
              <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Name</th>
              <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created At
              </th>

              <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Role</th>
              <th className={`px-6 py-3 text-right text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Actions</th>
            </tr>
          </thead>
          <tbody className={darkMode ? 'bg-gray-900 divide-y divide-gray-800' : 'bg-white divide-y divide-gray-200'}>
            {paginated.map(user => (
              <tr key={user._id} className={`${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50'} transition`}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=4f8cff&color=fff&size=64&rounded=true`} className="w-10 h-10 rounded-full" alt={user.name} />
                </td>
                <td className={`px-6 py-4 whitespace-nowrap font-semibold ${darkMode ? 'text-gray-100' : ''}`}>{user.name}</td>
                <td className={`px-6 py-4 whitespace-nowrap ${darkMode ? 'text-gray-300' : ''}`}>{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-700'}`}>Patient</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  {/* Only show delete for admins */}
                  {currentUserRole === "admin" && (
                    <button onClick={() => handleDeleteClick(user._id)} className="bg-red-500 text-white px-3 py-1 rounded-lg">Delete</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {paginated.length === 0 && (
          <div className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`}>No patients found.</div>
        )}
      </div>
      {/* Pagination controls */}
      <div className="flex justify-end items-center mt-4 gap-2">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className={`px-3 py-1 rounded ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-600'} disabled:opacity-50`}
        >
          Prev
        </button>
        <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Page {page} of {totalPages}</span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className={`px-3 py-1 rounded ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-600'} disabled:opacity-50`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PatientsList; 