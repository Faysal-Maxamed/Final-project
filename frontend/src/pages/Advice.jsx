"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import React from "react"
const API_URL = "http://localhost:5000/api/advice" // Replace with your backend URL

const Advice = () => {
  const [adviceList, setAdviceList] = useState([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [writtenBy, setWrittenBy] = useState("")
  const [updateId, setUpdateId] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [activeTab, setActiveTab] = useState("advice")
  const [expandedCards, setExpandedCards] = useState({})
  const [diagnosis, setDiagnosis] = useState("")
  const [positive, setPositive] = useState("")
  const [negative, setNegative] = useState("")
  const [pendingDeleteId, setPendingDeleteId] = useState(null)

  // Fetch all advice on component mount
  useEffect(() => {
    const fetchAdvice = async () => {
      try {
        const response = await axios.get(`${API_URL}/all`)
        setAdviceList(response.data)
      } catch (error) {
        console.error("Error fetching advice", error)
      }
    }
    fetchAdvice()
  }, [])

  // Create new advice
  const handleCreateAdvice = async () => {
    if (!diagnosis || !positive || !negative) {
      alert("All fields are required.");
      return;
    }
    try {
      const newAdvice = { diagnosis, positive, negative };
      const response = await axios.post(`${API_URL}/create`, newAdvice);
      setAdviceList([...adviceList, response.data]);
      setDiagnosis("");
      setPositive("");
      setNegative("");
      setShowModal(false);
    } catch (error) {
      alert("Error creating advice: " + (error.response?.data?.error || error.message));
      console.error("Error creating advice", error);
    }
  }

  // Update existing advice
  const handleUpdateAdvice = async () => {
    if (!updateId) return;
    if (!diagnosis || !positive || !negative) {
      alert("All fields are required.");
      return;
    }
    try {
      const updatedAdvice = { diagnosis, positive, negative };
      const response = await axios.patch(`${API_URL}/`, updatedAdvice);
      setAdviceList(adviceList.map((advice) =>
        advice._id === updateId ? response.data : advice
      ));
      setDiagnosis("");
      setPositive("");
      setNegative("");
      setUpdateId(null);
      setShowModal(false);
    } catch (error) {
      alert("Error updating advice: " + (error.response?.data?.error || error.message));
      console.error("Error updating advice", error);
    }
  }

  // Delete advice
  const handleDeleteAdvice = async (id) => {
    setPendingDeleteId(id);
  }

  const confirmDeleteAdvice = async () => {
    if (!pendingDeleteId) return;
    try {
      await axios.delete(`${API_URL}/${pendingDeleteId}`)
      setAdviceList(adviceList.filter((advice) => advice._id !== pendingDeleteId))
      setPendingDeleteId(null);
    } catch (error) {
      alert("Error deleting advice: " + (error.response?.data?.error || error.message));
      setPendingDeleteId(null);
    }
  }

  const cancelDeleteAdvice = () => {
    setPendingDeleteId(null);
  }

  // Set input fields for updating an advice
  const handleEditAdvice = (advice) => {
    setDiagnosis(advice.diagnosis)
    setPositive(advice.positive)
    setNegative(advice.negative)
    setUpdateId(advice._id)
    setShowModal(true)
  }

  // Toggle card expansion
  const toggleCardExpansion = (id) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  // Truncate text with ellipsis if not expanded
  const truncateText = (text, id) => {
    if (expandedCards[id]) {
      return text
    }

    // Simple truncation for CDN version
    if (text.length > 150) {
      return (
        <>
          {text.substring(0, 150)}...
          <div className="text-blue-600 text-sm mt-1 font-medium">Read more</div>
        </>
      )
    }
    return text
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
            Health Advice
          </h1>
          <p className="mt-2 text-gray-600">Browse and manage health advice for patients</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex space-x-4">
            <button
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                activeTab === "advice"
                  ? "bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("advice")}
            >
              Advice
            </button>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setUpdateId(null)
                setTitle("")
                setDescription("")
                setWrittenBy("")
                setShowModal(true)
              }}
              className="bg-gradient-to-r from-blue-600 to-teal-500 hover:shadow-lg text-white text-sm px-6 py-2.5 rounded-full transition-all duration-300 transform hover:-translate-y-1 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Add New Advice
            </button>
            <div className="text-sm bg-white px-4 py-2 rounded-full shadow-sm">
              <span className="text-gray-600">Total Advice: </span>
              <span className="font-semibold text-blue-600">{adviceList.length}</span>
            </div>
          </div>
        </div>

        {/* Modal Form for Create or Update Advice */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-lg w-full mx-auto border border-gray-100">
              <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
                {updateId ? "Edit Advice" : "Create New Advice"}
              </h2>
              <div className="space-y-5">
                <div>
                  <label htmlFor="diagnosis" className="block text-sm font-medium text-gray-700 mb-1">
                    Diagnosis
                  </label>
                  <input
                    id="diagnosis"
                    type="text"
                    placeholder="Enter diagnosis name"
                    value={diagnosis}
                    onChange={(e) => setDiagnosis(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={!!updateId} // Don't allow changing diagnosis on edit
                  />
                </div>
                <div>
                  <label htmlFor="positive" className="block text-sm font-medium text-gray-700 mb-1">
                    Positive Advice
                  </label>
                  <textarea
                    id="positive"
                    placeholder="Enter positive advice"
                    value={positive}
                    onChange={(e) => setPositive(e.target.value)}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  ></textarea>
                </div>
                <div>
                  <label htmlFor="negative" className="block text-sm font-medium text-gray-700 mb-1">
                    Negative Advice
                  </label>
                  <textarea
                    id="negative"
                    placeholder="Enter negative advice"
                    value={negative}
                    onChange={(e) => setNegative(e.target.value)}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  ></textarea>
                </div>
              </div>
              <div className="flex justify-end mt-8 space-x-4">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setDiagnosis("");
                    setPositive("");
                    setNegative("");
                    setUpdateId(null);
                  }}
                  className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={updateId ? handleUpdateAdvice : handleCreateAdvice}
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  {updateId ? "Update Advice" : "Create Advice"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Custom Delete Confirmation Modal */}
        {pendingDeleteId && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-sm w-full mx-auto border border-gray-100 text-center">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Are you sure you want to delete this advice?</h2>
              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={cancelDeleteAdvice}
                  className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDeleteAdvice}
                  className="px-6 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* List of Advice */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-6">All Advice</h2>
          {adviceList.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {adviceList.map((advice) => (
                <div
                  key={advice._id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100 flex flex-col"
                >
                  <div className="h-2 bg-gradient-to-r from-blue-600 to-teal-500"></div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-bold text-lg text-gray-800 mb-3">{advice.diagnosis}</h3>
                    <div className="mb-2">
                      <span className="font-semibold text-green-700">Positive:</span>
                      <p className="text-gray-600 whitespace-pre-line">{advice.positive}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-red-700">Negative:</span>
                      <p className="text-gray-600 whitespace-pre-line">{advice.negative}</p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleEditAdvice(advice)
                        }}
                        className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                        Edit
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteAdvice(advice._id)
                        }}
                        className="flex items-center text-sm font-medium text-red-500 hover:text-red-700 transition-colors ml-4"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow p-8 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto text-gray-300 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <p className="text-gray-500">No advice available. Create one using the button above.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Advice
