import React, { useEffect, useState } from "react";
import axios from "axios";
import RegisterAdmin from "./RegisterAdmin";
import { FaExclamationTriangle } from "react-icons/fa";

const AdminsList = () => {
  const [admins, setAdmins] = useState([]);
  const [search, setSearch] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Get current user info from localStorage
  const currentUserId = localStorage.getItem("userId");

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/users");
      setAdmins(res.data.filter(u => u.role === "admin"));
    } catch (err) {
      setAdmins([]);
    }
  };

  const showMsg = (msg, type = "success") => {
    setMessage(msg);
    setMessageType(type);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 2500);
  };

  const handleRegisterSuccess = () => {
    setShowRegister(false);
    fetchAdmins();
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/auth/deleteUser/${deleteId}`);
      setAdmins(admins.filter((user) => user._id !== deleteId));
      showMsg("Admin deleted successfully.", "success");
    } catch (err) {
      showMsg(err.response?.data?.error || "Failed to delete admin.", "error");
    } finally {
      setShowDeleteModal(false);
      setDeleteId(null);
    }
  };

  const filtered = admins.filter(
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
    <div className="py-8 px-4">
      {/* Message Box */}
      {showMessage && (
        <div className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-xl shadow-lg text-white font-semibold transition-all duration-300 ${messageType === "success" ? "bg-green-500" : "bg-red-500"}`}>
          {message}
        </div>
      )}
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="p-6 rounded-2xl shadow-2xl max-w-md w-full mx-4 bg-white">
            <div className="text-center">
              <FaExclamationTriangle className="text-4xl text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2 text-gray-900">
                Delete Admin
              </h3>
              <p className="mb-6 text-gray-600">
                Are you sure you want to delete this admin? This action cannot be undone.
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
          </div>
        </div>
      )}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-blue-700">Admins</h2>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Search admins..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400"
          />
          <label className="ml-2 text-sm text-gray-600">Show
            <select
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
              className="mx-2 p-1 border border-gray-300 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            entries
          </label>
          <button
            className="bg-gradient-to-r from-blue-600 to-teal-500 text-white px-5 py-2 rounded-lg font-semibold shadow hover:from-blue-700 hover:to-teal-600 transition-all"
            onClick={() => setShowRegister(true)}
          >
            + Register Admin
          </button>
        </div>
      </div>
      <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avatar</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created At
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginated.map(user => (
              <tr key={user._id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 whitespace-nowrap">
                  <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=4f8cff&color=fff&size=64&rounded=true`} className="w-10 h-10 rounded-full" alt={user.name} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-semibold">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">Admin</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  {user._id !== currentUserId && (
                    <button onClick={() => handleDeleteClick(user._id)} className="bg-red-500 text-white px-3 py-1 rounded-lg">Delete</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
        {paginated.length === 0 && (
          <div className="text-center text-gray-400 py-8">No admins found.</div>
        )}
      </div>
      {/* Pagination controls */}
      <div className="flex justify-end items-center mt-4 gap-2">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-3 py-1 rounded bg-gray-200 text-gray-600 disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-sm text-gray-700">Page {page} of {totalPages}</span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className="px-3 py-1 rounded bg-gray-200 text-gray-600 disabled:opacity-50"
        >
          Next
        </button>
      </div>
      {showRegister && <RegisterAdmin closePopup={handleRegisterSuccess} />}
    </div>
  );
};

export default AdminsList; 