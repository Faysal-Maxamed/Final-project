import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaStar, FaTrash, FaExclamationTriangle } from "react-icons/fa";

const Feedback = ({ darkMode }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [expandedIds, setExpandedIds] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");

  // Fetch feedbacks from backend
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/feedback");
        setFeedbacks(res.data);
      } catch (error) {
        console.error("Failed to fetch feedback:", error);
      }
    };
    fetchFeedbacks();
  }, []);

  // Toggle Read More
  const handleReadMore = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  // Delete handling
  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/feedback/${deleteId}`);
      setFeedbacks((prev) => prev.filter((f) => f._id !== deleteId));
      setSuccessMsg("Feedback deleted successfully!");
      setTimeout(() => setSuccessMsg(""), 2500);
    } catch (err) {
      console.error("Failed to delete feedback:", err);
    } finally {
      setShowDeleteModal(false);
      setDeleteId(null);
    }
  };

  const getInitial = (text) => text.charAt(0).toUpperCase();

  return (
    <div
      className={`min-h-screen py-10 px-4 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      <h2 className="text-3xl font-bold text-center mb-6">Customer Feedback</h2>

      {/* Success Message */}
      {successMsg && (
        <div className="max-w-md mx-auto mb-6 p-3 rounded-lg bg-green-500 text-white text-center font-semibold shadow-lg animate-fade-in">
          {successMsg}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className={`p-6 rounded-xl shadow-xl max-w-sm w-full ${
              darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
            }`}
          >
            <div className="text-center">
              <FaExclamationTriangle className="text-4xl text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Delete Feedback</h3>
              <p className="mb-6">
                Are you sure you want to delete this feedback? This cannot be
                undone.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 py-2 rounded-lg bg-gray-500 hover:bg-gray-600 text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {feedbacks.length === 0 ? (
          <p className="text-center col-span-full">No feedback available.</p>
        ) : (
          feedbacks.map((fb) => {
            const isExpanded = expandedIds.includes(fb._id);
            const feedbackText = isExpanded
              ? fb.feedback
              : fb.feedback.slice(0, 120);
            return (
              <div
                key={fb._id}
                className={`relative bg-white rounded-xl shadow-md p-5 flex flex-col justify-between border ${
                  darkMode
                    ? "bg-gray-800 text-white border-gray-700"
                    : "border-gray-200"
                }`}
              >
                {/* Avatar + Meta */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold">
                    {getInitial(fb.feedback)}
                  </div>
                  <div>
                    <h4 className="font-semibold">{fb.name || "Anonymous"}</h4>
                    <p className={`text-xs ${darkMode ? 'text-blue-300' : 'text-blue-600'} font-medium`}>{fb.email || "No email"}</p>
                    <p className="text-sm text-gray-400">
                      {new Date(fb.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Feedback Text */}
                <p className="mb-4">
                  "{feedbackText}"
                  {fb.feedback.length > 120 && (
                    <button
                      className="ml-2 text-blue-400 hover:underline text-sm"
                      onClick={() => handleReadMore(fb._id)}
                    >
                      {isExpanded ? "Show Less" : "Read More"}
                    </button>
                  )}
                </p>

                {/* Rating + Delete Button */}
                <div className="flex justify-between items-center">
                  <div className="flex gap-1 text-yellow-400">
                    {Array.from({ length: fb.rating }, (_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                  <button
                    onClick={() => handleDelete(fb._id)}
                    className="text-red-500 hover:text-red-600"
                    title="Delete Feedback"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Feedback;
