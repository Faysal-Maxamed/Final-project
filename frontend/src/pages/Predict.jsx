import React, { useState, useEffect } from "react";
import { predictReadmission } from "../api";
import Header from "../components/header";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { motion } from "framer-motion";
import { FaChevronRight, FaChevronLeft, FaClipboardCheck, FaUserMd, FaHospital, FaCalendarAlt, FaChartPie } from "react-icons/fa";

ChartJS.register(ArcElement, Tooltip, Legend);

const PredictorForm = () => {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    primary_diagnosis: "",
    num_procedures: "",
    days_in_hospital: "",
  });

  const [result, setResult] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState("");
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const primaryDiagnoses = [
    "Depressed Skull Fracture",
    "Abdominal Injury",
    "Open Femur Fracture",
    "Multiple Injury",
    "Diabetic Foot Gangrene",
    "Left Hand Fingers Injury",
    "Right Wrist Injury",
    "Left Toe Infected Wound",
    "Soft Tissue Injury Right Ankle Fracture",
    "Left Ankle Joint"
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    // Validate current step
    if (currentStep === 1) {
      if (!formData.age || !formData.gender) {
        setError("Please fill in all fields before proceeding");
        return;
      }
    } else if (currentStep === 2) {
      if (!formData.primary_diagnosis) {
        setError("Please select a diagnosis before proceeding");
        return;
      }
    }
    
    setError(null);
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setError(null);
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    const preparedData = {
      Age: Number(formData.age),
      Gender: formData.gender === "Male" ? 1 : 0,
      Primary_Diagnosis: Number(formData.primary_diagnosis),
      'Number of Procedures': Number(formData.num_procedures),
      'Days in Hospital': Number(formData.days_in_hospital),
    };

    try {
      const result = await predictReadmission(preparedData);
      setResult(result);
      setShowModal(true);

      if (result && !result.error) {
        const historyEntry = {
          ...formData,
          readmission: result.readmission === 1 ? "Yes" : "No",
          probability: `${(result.probability * 100).toFixed(2)}%`,
        };

        await fetch("http://localhost:5000/api/patient/history", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify(historyEntry),
        });
      }
    } catch (error) {
      console.error("Error making prediction:", error);
      setError("Prediction failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRatingClick = (emoji) => {
    setRating(emoji);
  };

  const handleFeedbackSubmit = async () => {
    if (!feedback || !rating) {
      alert("Please provide both feedback and a rating.");
      return;
    }

    const feedbackData = {
      feedback,
      rating,
      timestamp: new Date(),
    };

    await fetch("http://localhost:5000/api/feedback", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(feedbackData),
    });

    setFeedback("");
    setRating("");
    alert("Feedback submitted. Thank you!");
  };

  const chartData = {
    labels: ["Readmission Risk", "No Readmission Risk"],
    datasets: [
      {
        data: [
          result?.readmission === 1
            ? result?.probability * 100
            : 100 - result?.probability * 100,
          result?.readmission === 0
            ? result?.probability * 100
            : 100 - result?.probability * 100,
        ],
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverBackgroundColor: ["#FF4384", "#2A91D3"],
        borderWidth: 2,
        borderColor: darkMode ? "#374151" : "#f9fafb",
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: darkMode ? '#f9fafb' : '#1f2937',
          font: {
            size: 14,
            weight: 'bold'
          },
          padding: 20
        }
      },
      tooltip: {
        backgroundColor: darkMode ? '#374151' : '#f9fafb',
        titleColor: darkMode ? '#f9fafb' : '#1f2937',
        bodyColor: darkMode ? '#f9fafb' : '#1f2937',
        padding: 12,
        cornerRadius: 8,
        boxPadding: 6
      }
    },
    cutout: '65%',
    animation: {
      animateScale: true,
      animateRotate: true
    }
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("bg-gray-900", "text-white");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("bg-gray-900", "text-white");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Form step components
  const renderFormStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center mb-6">
              <div className="bg-blue-500 rounded-full p-2 mr-3">
                <FaUserMd className="text-white text-xl" />
              </div>
              <h3 className={`text-xl font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>
                Patient Information
              </h3>
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-white" : "text-gray-700"}`}>
                Age
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                min="1"
                max="120"
                placeholder="Enter patient age"
                required
                className={`w-full p-3 border rounded-lg focus:ring focus:ring-blue-300 transition-all ${
                  darkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-black border-gray-300"
                }`}
              />
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-white" : "text-gray-700"}`}>
                Gender
              </label>
              <div className="grid grid-cols-2 gap-4">
                {["Male", "Female"].map((gender) => (
                  <label
                    key={gender}
                    className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-all ${
                      formData.gender === gender
                        ? darkMode
                          ? "bg-blue-600 border-blue-500 text-white"
                          : "bg-blue-50 border-blue-500 text-blue-700"
                        : darkMode
                          ? "bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                          : "bg-white border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="gender"
                      value={gender}
                      checked={formData.gender === gender}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    {gender}
                  </label>
                ))}
              </div>
            </div>
          </motion.div>
        );
      
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center mb-6">
              <div className="bg-green-500 rounded-full p-2 mr-3">
                <FaClipboardCheck className="text-white text-xl" />
              </div>
              <h3 className={`text-xl font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>
                Medical Diagnosis
              </h3>
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-white" : "text-gray-700"}`}>
                Primary Diagnosis
              </label>
              <div className={`p-1 border rounded-lg ${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"}`}>
                <select
                  name="primary_diagnosis"
                  value={formData.primary_diagnosis}
                  onChange={handleChange}
                  required
                  className={`w-full p-3 rounded-md focus:ring focus:ring-blue-300 transition-all ${
                    darkMode ? "bg-gray-700 text-white" : "bg-white text-black"
                  }`}
                >
                  <option value="">Select Diagnosis</option>
                  {primaryDiagnoses.map((diag, i) => (
                    <option key={i} value={i}>{diag}</option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        );
      
      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center mb-6">
              <div className="bg-purple-500 rounded-full p-2 mr-3">
                <FaHospital className="text-white text-xl" />
              </div>
              <h3 className={`text-xl font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>
                Hospital Details
              </h3>
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-white" : "text-gray-700"}`}>
                Number of Procedures
              </label>
              <input
                type="number"
                name="num_procedures"
                value={formData.num_procedures}
                onChange={handleChange}
                min="0"
                placeholder="Enter number of procedures"
                required
                className={`w-full p-3 border rounded-lg focus:ring focus:ring-blue-300 transition-all ${
                  darkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-black border-gray-300"
                }`}
              />
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-white" : "text-gray-700"}`}>
                Days in Hospital
              </label>
              <div className="relative">
                <div className={`absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                  <FaCalendarAlt />
                </div>
                <input
                  type="number"
                  name="days_in_hospital"
                  value={formData.days_in_hospital}
                  onChange={handleChange}
                  min="1"
                  placeholder="Enter days in hospital"
                  required
                  className={`w-full p-3 pl-10 border rounded-lg focus:ring focus:ring-blue-300 transition-all ${
                    darkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-black border-gray-300"
                  }`}
                />
              </div>
            </div>
          </motion.div>
        );
      
      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center mb-6">
              <div className="bg-teal-500 rounded-full p-2 mr-3">
                <FaChartPie className="text-white text-xl" />
              </div>
              <h3 className={`text-xl font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>
                Confirm and Predict
              </h3>
            </div>
            
            <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
              <h4 className={`font-medium mb-3 ${darkMode ? "text-white" : "text-gray-800"}`}>Summary</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className={darkMode ? "text-gray-400" : "text-gray-600"}>Age:</span>
                  <span className="font-medium">{formData.age}</span>
                </div>
                <div className="flex justify-between">
                  <span className={darkMode ? "text-gray-400" : "text-gray-600"}>Gender:</span>
                  <span className="font-medium">{formData.gender}</span>
                </div>
                <div className="flex justify-between">
                  <span className={darkMode ? "text-gray-400" : "text-gray-600"}>Diagnosis:</span>
                  <span className="font-medium">{primaryDiagnoses[formData.primary_diagnosis]}</span>
                </div>
                <div className="flex justify-between">
                  <span className={darkMode ? "text-gray-400" : "text-gray-600"}>Procedures:</span>
                  <span className="font-medium">{formData.num_procedures}</span>
                </div>
                <div className="flex justify-between">
                  <span className={darkMode ? "text-gray-400" : "text-gray-600"}>Days in Hospital:</span>
                  <span className="font-medium">{formData.days_in_hospital}</span>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Click "Predict" to analyze readmission risk based on the provided information.
              </p>
            </div>
          </motion.div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className={`min-h-screen flex items-center justify-center p-6 ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`w-full max-w-lg shadow-xl rounded-2xl overflow-hidden ${darkMode ? "bg-gray-800" : "bg-white"}`}
        >
          {/* Progress bar */}
          <div className={`w-full h-1 ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}>
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-teal-500 transition-all duration-300"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            ></div>
          </div>
          
          {/* Header */}
          <div className={`p-6 border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
            <h2 className={`text-2xl font-bold text-center ${darkMode ? "text-white" : "text-gray-800"}`}>
              Readmission Predictor
            </h2>
            <div className="flex justify-center mt-4">
              {[1, 2, 3, 4].map((step) => (
                <div 
                  key={step}
                  className={`w-8 h-8 rounded-full flex items-center justify-center mx-1 transition-all ${
                    currentStep === step
                      ? "bg-gradient-to-r from-blue-600 to-teal-500 text-white"
                      : currentStep > step
                        ? darkMode 
                          ? "bg-gray-700 text-gray-300" 
                          : "bg-gray-200 text-gray-700"
                        : darkMode
                          ? "bg-gray-900 text-gray-500"
                          : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {step}
                </div>
              ))}
            </div>
          </div>
          
          {/* Form content */}
          <div className="p-6">
            <form onSubmit={handleSubmit}>
              {renderFormStep()}
              
              {error && (
                <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg border border-red-200">
                  {error}
                </div>
              )}
              
              {/* Navigation buttons */}
              <div className="flex justify-between mt-8">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    className={`px-4 py-2 rounded-lg flex items-center transition-all ${
                      darkMode 
                        ? "bg-gray-700 text-white hover:bg-gray-600" 
                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                  >
                    <FaChevronLeft className="mr-2" /> Back
                  </button>
                ) : (
                  <div></div>
                )}
                
                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-lg flex items-center hover:from-blue-700 hover:to-teal-600 transition-all"
                  >
                    Next <FaChevronRight className="ml-2" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-lg flex items-center hover:from-blue-700 hover:to-teal-600 transition-all disabled:opacity-70"
                  >
                    {isLoading ? "Processing..." : "Predict"}
                  </button>
                )}
              </div>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Modal */}
      {showModal && result && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`p-8 rounded-2xl w-full max-w-lg shadow-2xl ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}
          >
            <h2 className="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500">
              Prediction Result
            </h2>
            
            <div className="flex flex-col items-center">
              <div className="relative w-64 h-64 mb-6">
                <Pie data={chartData} options={chartOptions} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`text-center ${darkMode ? "text-white" : "text-gray-900"}`}>
                    <div className="text-3xl font-bold">{(result.probability * 100).toFixed(1)}%</div>
                    <div className="text-sm opacity-75">Probability</div>
                  </div>
                </div>
              </div>
              
              <div className={`mb-6 p-4 rounded-xl text-center ${
                result.readmission === 1
                  ? "bg-red-100 text-red-800 border border-red-200"
                  : "bg-green-100 text-green-800 border border-green-200"
              }`}>
                <h3 className="font-bold text-lg mb-1">
                  {result.readmission === 1 ? "Readmission Risk Detected" : "Low Readmission Risk"}
                </h3>
                <p>
                  {result.readmission === 1 
                    ? "This patient has a significant risk of readmission based on the provided factors."
                    : "This patient has a low risk of readmission based on the provided factors."
                  }
                </p>
              </div>
            </div>

            <div className={`mt-6 p-4 rounded-xl ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}>
              <h4 className="font-medium mb-3 text-center">Rate our Prediction</h4>
              <div className="flex justify-center space-x-3 mb-4">
                {["😡", "😞", "😐", "😊", "😀"].map((emoji, i) => (
                  <button 
                    key={i} 
                    onClick={() => handleRatingClick(emoji)} 
                    className={`text-2xl p-2 rounded-full transition-all ${
                      rating === emoji 
                        ? darkMode 
                          ? "bg-blue-600 transform scale-110" 
                          : "bg-blue-100 transform scale-110"
                        : "hover:bg-gray-200"
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
              
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows="3"
                placeholder="Write your feedback here..."
                className={`w-full p-3 border rounded-lg resize-none ${
                  darkMode ? "bg-gray-800 text-white border-gray-600" : "bg-white text-black border-gray-300"
                }`}
              />
              
              <div className="flex space-x-3 mt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className={`flex-1 py-2 rounded-lg transition-all ${
                    darkMode 
                      ? "bg-gray-600 text-white hover:bg-gray-500" 
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`}
                >
                  Close
                </button>
                <button
                  onClick={handleFeedbackSubmit}
                  className="flex-1 py-2 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-lg hover:from-blue-700 hover:to-teal-600 transition-all"
                >
                  Submit Feedback
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default PredictorForm;