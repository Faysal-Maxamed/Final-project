import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/advice"; // Replace with your backend URL

const Advice = () => {
  const [adviceList, setAdviceList] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [writtenBy, setWrittenBy] = useState(""); // New state for writtenBy
  const [updateId, setUpdateId] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [activeTab, setActiveTab] = useState("advice"); // State to manage active tab

  // Fetch all advice on component mount
  useEffect(() => {
    const fetchAdvice = async () => {
      try {
        const response = await axios.get(`${API_URL}/all`);
        setAdviceList(response.data);
      } catch (error) {
        console.error("Error fetching advice", error);
      }
    };
    fetchAdvice();
  }, []);

  // Create new advice
  const handleCreateAdvice = async () => {
    try {
      const newAdvice = { title, description, writtenBy }; // Include writtenBy
      const response = await axios.post(`${API_URL}/create`, newAdvice);
      setAdviceList([...adviceList, response.data]); // Add the new advice to the list
      setTitle("");
      setDescription("");
      setWrittenBy(""); // Clear writtenBy field
      setShowModal(false); // Close the modal after submitting
    } catch (error) {
      console.error("Error creating advice", error);
    }
  };

  // Update existing advice
  const handleUpdateAdvice = async () => {
    if (!updateId) return;

    try {
      const updatedAdvice = { title, description, writtenBy }; // Include writtenBy
      const response = await axios.put(`${API_URL}/advice/${updateId}`, updatedAdvice);
      setAdviceList(adviceList.map((advice) =>
        advice._id === updateId ? response.data : advice
      ));
      setTitle("");
      setDescription("");
      setWrittenBy(""); // Clear writtenBy field
      setUpdateId(null);
    } catch (error) {
      console.error("Error updating advice", error);
    }
  };

  // Delete advice
  const handleDeleteAdvice = async (id) => {
    try {
      await axios.delete(`${API_URL}/advice/${id}`);
      setAdviceList(adviceList.filter((advice) => advice._id !== id)); // Remove deleted advice from the list
    } catch (error) {
      console.error("Error deleting advice", error);
    }
  };

  // Set input fields for updating an advice
  const handleEditAdvice = (advice) => {
    setTitle(advice.title);
    setDescription(advice.description);
    setWrittenBy(advice.writtenBy); // Set writtenBy for editing
    setUpdateId(advice._id);
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">

      {/* Tab Navigation */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === "advice"
              ? "bg-purple-600 text-white"
              : "bg-gray-200 text-gray-700"
              }`}
            onClick={() => setActiveTab("advice")}
          >
            Advice
          </button>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowModal(true)} // Open the modal when clicked
            className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-5 py-2 rounded-md"
          >
            Add New Advice
          </button>
          <div className="text-sm text-gray-600">
            <p>Total Advice: <span className="font-semibold">{adviceList.length}</span></p>
          </div>
        </div>
      </div>

      {/* Modal Form for Create or Update Advice */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-gray-700">
              {updateId ? "Edit Advice" : "Create New Advice"}
            </h2>
            <input
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <input
              type="text"
              placeholder="Enter author's name"
              value={writtenBy}
              onChange={(e) => setWrittenBy(e.target.value)} // Handling the input for writtenBy
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-end">
              <button
                onClick={updateId ? handleUpdateAdvice : handleCreateAdvice}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                {updateId ? "Update Advice" : "Create Advice"}
              </button>
              <button
                onClick={() => setShowModal(false)} // Close modal on cancel
                className="ml-4 bg-gray-300 text-black px-6 py-2 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* List of Advice */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-700">All Advice</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {adviceList.length > 0 ? (
            adviceList.map((advice) => (
              <div
                key={advice._id}
                className="bg-white shadow-lg rounded-lg p-6 flex flex-col space-y-4"
              >
                <h3 className="font-semibold text-lg text-gray-800">{advice.title}</h3>
                <p className="text-gray-600">{advice.description}</p>
                <p className="text-sm text-gray-500">Written by: {advice.writtenBy}</p> {/* Displaying writtenBy */}
                <div className="flex justify-between space-x-3">
                  <button
                    onClick={() => handleEditAdvice(advice)}
                    className="text-yellow-500 hover:text-yellow-700 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteAdvice(advice._id)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No advice available. Create one above.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Advice;
