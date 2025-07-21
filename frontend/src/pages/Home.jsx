import React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import doctor1 from "../assets/doc1.png"
import doctor2 from "../assets/doc2.png"
import doctor3 from "../assets/doc3.png"
import { FaCheckCircle, FaHandsHelping, FaHeartbeat, FaStethoscope, FaArrowRight, FaChartLine, FaUserMd, FaPlay, FaQuoteLeft } from "react-icons/fa"
import Header from "../components/header"
import Footer from "../components/footer"
import HealthTips from "../components/HealthTips"
import axios from "axios"
import { useNavigate } from "react-router-dom";


const images = [doctor1, doctor2, doctor3]

const Homepage = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark")
  const [showFullText, setShowFullText] = useState(false)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [feedbacks, setFeedbacks] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("bg-gray-900", "text-white")
      localStorage.setItem("theme", "dark")
    } else {
      document.body.classList.remove("bg-gray-900", "text-white")
      localStorage.setItem("theme", "light")
    }
  }, [darkMode])

  // Add this to your component
  useEffect(() => {
    // Add this to your CSS
    const styleSheet = document.createElement("style")
    styleSheet.textContent = `
    @keyframes spin-slow {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
    .animate-spin-slow {
      animation: spin-slow 30s linear infinite;
    }
    
    @keyframes float {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-10px);
      }
    }
    .animate-float {
      animation: float 6s ease-in-out infinite;
    }
    
    .hero-gradient {
      background: linear-gradient(135deg, rgba(56, 189, 248, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%);
    }

    .text-glow {
      text-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
    }

    .card-glow {
      box-shadow: 0 0 20px rgba(59, 130, 246, 0.2);
    }

    .blob {
      border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%;
      animation: morph 8s linear infinite;
    }

    @keyframes morph {
      0% { border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%; }
      25% { border-radius: 45% 55% 65% 35% / 50% 50% 50% 50%; }
      50% { border-radius: 50% 50% 55% 45% / 55% 45% 45% 55%; }
      75% { border-radius: 55% 45% 50% 50% / 45% 55% 45% 55%; }
      100% { border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%; }
    }

    .bg-grid-pattern {
      background-image: linear-gradient(to right, rgba(99, 102, 241, 0.1) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(99, 102, 241, 0.1) 1px, transparent 1px);
      background-size: 40px 40px;
    }
  `
    document.head.appendChild(styleSheet)

    return () => {
      document.head.removeChild(styleSheet)
    }
  }, [])

  // Fetch feedback data from backend
  useEffect(() => {
    const fetchFeedbacks = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get("http://localhost:5000/api/feedback")
        setFeedbacks(response.data)
      } catch (error) {
        console.error("Error fetching feedback data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchFeedbacks()
  }, [])

  const shortText =
    "Advanced hospital readmission prediction using machine learning. Our AI-driven system helps hospitals prevent unnecessary readmissions..."
  const fullText =
    "In recent years, the healthcare sector has seen a significant shift towards leveraging technology for improving patient outcomes. One of the most promising advancements is the application of machine learning (ML) algorithms in predicting hospital readmissions. By analyzing vast amounts of patient data, including demographics, medical history, and treatment plans, these algorithms can identify patterns and risk factors that lead to readmission. This predictive capability enables healthcare providers to intervene proactively while allowing personalized care strategies tailored to individual patient needs."

  return (
    <div className={`w-full min-h-screen font-sans ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Enhanced Hero Section */}
      <section
        className={`relative overflow-hidden py-20 md:py-16 px-4 sm:px-6 lg:px-8 ${
          darkMode 
            ? "bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900" 
            : "bg-gradient-to-br from-blue-50 via-white to-indigo-50"
        }`}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Animated circles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full ${darkMode ? 'bg-blue-500/10' : 'bg-blue-400/10'}`}
              style={{
                width: `${Math.random() * 400 + 100}px`,
                height: `${Math.random() * 400 + 100}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 60 - 30],
                y: [0, Math.random() * 60 - 30],
              }}
              transition={{
                duration: Math.random() * 15 + 10,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
          
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          
          {/* Gradient orbs */}
          <div className="absolute top-1/4 -left-24 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl"></div>
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl space-y-8 text-left">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20 backdrop-blur-sm"
              >
                <p className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500 flex items-center">
                  <span className="flex h-2 w-2 mr-2">
                    <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                  </span>
                  HPR-Powered Healthcare Solutions
                </p>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight"
              >
                <span className={`bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500 ${darkMode ? "text-glow" : ""}`}>
                  Take Care of Your Health
                </span>
                <br />
                <span className={darkMode ? "text-white" : "text-gray-800"}>
                  with Smart Predictions
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className={`text-lg sm:text-xl ${darkMode ? "text-gray-300" : "text-gray-700"} leading-relaxed`}
              >
                {showFullText ? fullText : shortText}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap gap-4"
              >
                <button
                  onClick={() => navigate("/PredictorForm")}
                  className="px-6 py-3 text-lg font-medium bg-gradient-to-r from-blue-600 to-indigo-500 text-white rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-300 flex items-center"
                >
                  Try Prediction <FaArrowRight className="ml-2" />
                </button>
                
                <button
                  className={`px-6 py-3 text-lg font-medium rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-1 transition duration-300 flex items-center ${
                    darkMode 
                      ? "bg-gray-800 text-white border border-gray-700 hover:bg-gray-700" 
                      : "bg-white text-gray-800 border border-gray-200 hover:bg-gray-50"
                  }`}
                  onClick={() => setIsVideoModalOpen(true)}
                >
                  <FaPlay className="mr-2 text-blue-500" /> Watch Demo
                </button>
                
                <button
                  className={`px-6 py-3 text-lg font-medium rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-1 transition duration-300 flex items-center ${
                    darkMode 
                      ? "bg-transparent text-white border border-gray-700 hover:bg-gray-800/50" 
                      : "bg-transparent text-gray-800 border border-gray-200 hover:bg-gray-50/50"
                  }`}
                  onClick={() => setShowFullText(!showFullText)}
                >
                  {showFullText ? "Show Less" : "Learn More"}
                </button>
              </motion.div>
              
              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className={`grid grid-cols-3 gap-4 mt-8 p-5 rounded-2xl ${
                  darkMode 
                    ? "bg-gray-800/40 backdrop-blur-sm border border-gray-700/50" 
                    : "bg-white/70 backdrop-blur-sm border border-gray-100 card-glow"
                }`}
              >
                {[
                  { value: "95%", label: "Accuracy", icon: <FaChartLine className="text-blue-500" /> },
                  { value: "10k+", label: "Predictions", icon: <FaUserMd className="text-indigo-500" /> },
                  { value: "24/7", label: "Support", icon: <FaHeartbeat className="text-red-500" /> }
                ].map((stat, i) => (
                  <div key={i} className="text-center p-3 rounded-xl hover:bg-blue-50/50 dark:hover:bg-gray-700/50 transition-all duration-300">
                    <div className="flex justify-center mb-2">{stat.icon}</div>
                    <div className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>{stat.value}</div>
                    <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative z-10"
            >
              {/* 3D-like image display */}
              <div className="relative w-[340px] h-[400px] perspective-1000">
                <div className="blob absolute w-[340px] h-[400px] bg-gradient-to-br from-blue-500/20 to-indigo-500/20 backdrop-blur-sm -z-10 transform -rotate-6"></div>
                
                {/* Main image */}
                <motion.div
                  animate={{ 
                    rotateY: [0, 5, 0, -5, 0],
                    rotateX: [0, -5, 0, 5, 0],
                  }}
                  transition={{ 
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut" 
                  }}
                  className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800 transform rotate-3"
                >
                  <img
                    src={images[activeIndex]}
                    alt="Healthcare professional"
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Overlay with gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent">
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <div className="flex items-center mb-3">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></div>
                        <span className="text-xs font-medium uppercase tracking-wider text-green-300">Live Prediction</span>
                      </div>
                      <h3 className="text-xl font-bold mb-1">Readmission Risk Analysis</h3>
                      <p className="text-sm text-blue-100">HPR-powered insights for better healthcare decisions</p>
                      
                      {/* Progress bar */}
                      <div className="mt-4 h-1 w-full bg-white/30 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-blue-500"
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Floating elements */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className={`absolute -bottom-6 -left-6 px-4 py-3 rounded-lg shadow-lg ${
                    darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-100"
                  }`}
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <FaCheckCircle className="text-green-600" />
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  className={`absolute -top-6 -right-6 px-4 py-3 rounded-lg shadow-lg ${
                    darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-100"
                  }`}
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <FaUserMd className="text-blue-600" />
                    </div>
                    <div>
                      <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>System Analysis</p>
                      <p className={`font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>Processing...</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
          
          {/* Decorative wave */}
          <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full">
              <path 
                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0Z" 
                className={darkMode ? "fill-gray-900" : "fill-gray-50"}
              ></path>
            </svg>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setIsVideoModalOpen(false)}>
          <div className="relative w-full max-w-4xl bg-black rounded-xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <button 
              className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-all z-10"
              onClick={() => setIsVideoModalOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <div className="aspect-video">
              <video controls autoPlay className="w-full h-full rounded-xl">
                <source src="/introduction.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced What We Do Section */}
      <section className={`py-24 ${darkMode ? "bg-gray-800" : "bg-white"} px-4 sm:px-6 lg:px-8 overflow-hidden`}>
        <div className="container mx-auto max-w-7xl relative">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center relative z-10 mb-20"
          >
            <div className="inline-block px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
              Our Services
            </div>
            <h2 className={`text-4xl sm:text-5xl font-bold ${darkMode ? "text-white" : "text-gray-900"} mb-6`}>
              What We <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">Do</span>
            </h2>
            <p className={`max-w-2xl mx-auto text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Our advanced AI system provides comprehensive healthcare solutions to improve patient outcomes and reduce hospital readmissions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            {[
              {
                icon: <FaHandsHelping className="text-blue-600 text-5xl" />,
                title: "Concise & Direct",
                desc: "We provide clear readmission insights with actionable recommendations for healthcare providers.",
                color: "blue",
              },
              {
                icon: <FaHeartbeat className="text-red-500 text-5xl" />,
                title: "Outcome Focused",
                desc: "Our AI algorithms analyze patient data to identify risk factors and prevent unnecessary readmissions.",
                color: "red",
              },
              {
                icon: <FaStethoscope className="text-green-500 text-5xl" />,
                title: "Mission-Oriented",
                desc: "We're dedicated to improving healthcare outcomes through advanced predictive analytics.",
                color: "green",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className={`relative group overflow-hidden rounded-2xl shadow-xl transition-all duration-300 ${
                  darkMode ? "bg-gray-700/50 backdrop-blur-sm border border-gray-600" : "bg-white border border-gray-100"
                }`}
              >
                {/* Top gradient line */}
                <div className={`h-2 bg-gradient-to-r ${
                  item.color === "blue" ? "from-blue-400 to-blue-600" : 
                  item.color === "red" ? "from-red-400 to-red-500" : 
                  "from-green-400 to-green-500"
                }`}></div>
                
                <div className="p-8">
                  {/* Animated icon container */}
                  <div className="mb-6 relative">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${
                      item.color === "blue" ? "bg-blue-100 dark:bg-blue-900/30" : 
                      item.color === "red" ? "bg-red-100 dark:bg-red-900/30" : 
                      "bg-green-100 dark:bg-green-900/30"
                    }`}>
                      {item.icon}
                    </div>
                    
                    {/* Animated ring */}
                    <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full border-2 ${
                      item.color === "blue" ? "border-blue-400/30" : 
                      item.color === "red" ? "border-red-400/30" : 
                      "border-green-400/30"
                    } opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-700`}></div>
                  </div>
                  
                  <h3 className={`text-2xl font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-800"}`}>
                    {item.title}
                  </h3>
                  <p className={`${darkMode ? "text-gray-300" : "text-gray-600"} text-lg`}>{item.desc}</p>
                  
                  {/* Hover reveal button */}
                  <div className="mt-6 overflow-hidden h-8">
                    <div className="transform translate-y-10 group-hover:translate-y-0 transition-transform duration-300">
                      <a href="#" className={`inline-flex items-center font-medium ${
                        item.color === "blue" ? "text-blue-600 dark:text-blue-400" : 
                        item.color === "red" ? "text-red-500 dark:text-red-400" : 
                        "text-green-500 dark:text-green-400"
                      }`}>
                        Learn more <FaArrowRight className="ml-2" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced How It Works Section */}
      <section className={`py-24 px-4 sm:px-6 lg:px-8 ${darkMode ? "bg-gray-900" : "bg-gray-50"} overflow-hidden`}>
        <div className="container mx-auto max-w-7xl relative">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-br from-indigo-500/10 to-blue-500/10 rounded-full blur-2xl"></div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center relative z-10 mb-20"
          >
            <div className="inline-block px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-4">
              Our Process
            </div>
            <h2 className={`text-4xl sm:text-5xl font-bold ${darkMode ? "text-white" : "text-gray-900"} mb-6`}>
              How It <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500">Works</span>
            </h2>
            <p className={`max-w-2xl mx-auto text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Our advanced machine learning system follows a precise workflow to deliver accurate readmission predictions.
            </p>
          </motion.div>

          <div className="relative">
            {/* Connection line with animation */}
            <div className="hidden md:block absolute top-1/2 left-[16.66%] right-[16.66%] h-1 transform -translate-y-1/2 z-0">
              <div className="h-full bg-gradient-to-r from-purple-500 via-blue-600 to-green-500 rounded-full"></div>
              <motion.div 
                className="absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-white/0 via-white/80 to-white/0 dark:from-gray-900/0 dark:via-gray-900/80 dark:to-gray-900/0"
                animate={{ x: ["0%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative z-10">
              {[
                {
                  icon: <FaCheckCircle className="text-purple-500 text-5xl" />,
                  step: "Data Collection",
                  desc: "We securely collect relevant patient medical records and history data.",
                  color: "purple",
                  number: 1,
                },
                {
                  icon: <FaCheckCircle className="text-blue-600 text-5xl" />,
                  step: "Data Processing",
                  desc: "Our AI algorithms clean, normalize, and prepare the data for analysis.",
                  color: "blue",
                  number: 2,
                },
                {
                  icon: <FaCheckCircle className="text-green-500 text-5xl" />,
                  step: "Prediction Model",
                  desc: "Machine learning models analyze patterns to predict readmission risk.",
                  color: "green",
                  number: 3,
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className={`relative z-10 ${
                    darkMode ? "bg-gray-800/70 backdrop-blur-sm border border-gray-700" : "bg-white border border-gray-100"
                  } shadow-xl p-8 rounded-2xl transition-all duration-300 hover:shadow-2xl`}
                >
                  <div className="relative">
                    <div
                      className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
                        item.color === "purple" ? "bg-purple-100 dark:bg-purple-900/30" : 
                        item.color === "blue" ? "bg-blue-100 dark:bg-blue-900/30" : 
                        "bg-green-100 dark:bg-green-900/30"
                      }`}
                    >
                      {item.icon}
                    </div>
                    
                    {/* Step number with animation */}
                    <div className={`absolute top-0 -right-2 w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                      item.color === "purple" ? "bg-purple-500" : 
                      item.color === "blue" ? "bg-blue-600" : 
                      "bg-green-500"
                    } shadow-lg transform transition-transform duration-300 hover:scale-110`}>
                      {item.number}
                    </div>
                  </div>
                  
                  <h3 className={`text-2xl font-semibold mb-4 text-center ${darkMode ? "text-white" : "text-gray-800"}`}>
                    {item.step}
                  </h3>
                  <p className={`${darkMode ? "text-gray-300" : "text-gray-600"} text-lg text-center`}>{item.desc}</p>
                  
                  {/* Animated underline on hover */}
                  <div className="h-1 w-0 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mt-4 group-hover:w-16 transition-all duration-300"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Connected to Backend */}
      <section className={`py-24 px-4 sm:px-6 lg:px-8 ${darkMode ? "bg-gray-900" : "bg-white"}`}>
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl sm:text-5xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>
              What Our{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">Patients</span>{" "}
              Say
            </h2>
            <p className={`max-w-3xl mx-auto text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Real stories from patients who have experienced our innovative healthcare solutions and readmission
              prediction system.
            </p>
          </motion.div>

          {/* Testimonial Cards */}
          <div className="relative">
            {/* Decorative elements */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
              <div className="w-[500px] h-[500px] rounded-full border-8 border-dashed border-blue-500 animate-spin-slow"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
              <div className="w-[700px] h-[700px] rounded-full border-2 border-indigo-500"></div>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-8 relative z-10">
                {(feedbacks.length > 0 ? feedbacks.slice(0, 3) : [
                  {
                    name: "Sarah Johnson",
                    role: "Cardiac Patient",
                    image: "https://randomuser.me/api/portraits/women/32.jpg",
                    feedback: "The readmission prediction system gave me peace of mind during my recovery. My care team used the insights to create a personalized plan that kept me healthy at home.",
                    rating: 5,
                  },
                  {
                    name: "Michael Chen",
                    role: "Diabetes Patient",
                    image: "https://randomuser.me/api/portraits/men/54.jpg",
                    feedback: "As someone with complex health needs, I've been in and out of hospitals for years. This system helped identify risk factors I wasn't aware of and significantly reduced my hospital visits.",
                    rating: 5,
                  },
                  {
                    name: "Amina Hassan",
                    role: "Post-Surgery Patient",
                    image: "https://randomuser.me/api/portraits/women/45.jpg",
                    feedback: "After my surgery, I was worried about complications. The prediction system helped my doctors monitor my recovery and intervene early when issues arose. Truly revolutionary care.",
                    rating: 4,
                  },
                ]).map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    whileHover={{ y: -10, transition: { duration: 0.3 } }}
                    className={`relative rounded-2xl overflow-hidden shadow-xl ${
                      darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-100"
                    }`}
                  >
                    {/* Decorative top bar */}
                    <div className="h-2 bg-gradient-to-r from-blue-600 to-indigo-500"></div>

                    <div className="p-8">
                      {/* Quote mark */}
                      <div className="absolute top-8 right-8 text-6xl opacity-10">
                        <FaQuoteLeft className={darkMode ? "text-white" : "text-gray-800"} />
                      </div>

                      {/* Content */}
                      <div className="flex flex-col h-full">
                        <p className={`text-lg italic mb-6 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                          {testimonial.name ? `Hi ${testimonial.name}, ` : ""}
                          "{testimonial.feedback}"
                        </p>

                        <div className="mt-auto">
                          {/* Rating */}
                          <div className="flex mb-4">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-5 h-5 ${i < testimonial.rating ? "text-yellow-500" : "text-gray-300"}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                              </svg>
                            ))}
                          </div>

                          {/* Author */}
                          <div className="flex items-center">
                            <div className="h-12 w-12 rounded-full overflow-hidden mr-4 border-2 border-blue-500">
                              <img
                                src={testimonial.image || "https://www.google.com/imgres?q=profile&imgurl=https%3A%2F%2Fwww.shutterstock.com%2Fimage-vector%2Fuser-profile-icon-vector-avatar-600nw-2220431045.jpg&imgrefurl=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fblank-profile-picture&docid=6PF0lYIppkG5DM&tbnid=hhKhvYUwtV0WwM&vet=12ahUKEwiwvIzmioOOAxVrzgIHHUBKES0QM3oECBoQAA..i&w=600&h=600&hcb=2&ved=2ahUKEwiwvIzmioOOAxVrzgIHHUBKES0QM3oECBoQAA"}
                                alt={testimonial.name || "User"}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <h4 className={`font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                                {testimonial.name || "Patient Name"}
                              </h4>
                              <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                {testimonial.role || "Patient"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Testimonial Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { value: "95%", label: "Patient Satisfaction" },
              { value: "2,500+", label: "Patients Served" },
              { value: "32%", label: "Reduced Readmissions" },
              { value: "4.8/5", label: "Average Rating" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500 mb-2">
                  {stat.value}
                </div>
                <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <div className="mt-16 text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-500 text-white rounded-full text-lg font-medium shadow-lg hover:shadow-xl transform transition duration-300"
            >
              Read More Success Stories
            </motion.button>
          </div>
        </div>
      </section>
      
      {/* Health Tips Section */}
      <HealthTips darkMode={darkMode} />
      
      <Footer darkMode={darkMode} />
    </div>
  )
}

export default Homepage
