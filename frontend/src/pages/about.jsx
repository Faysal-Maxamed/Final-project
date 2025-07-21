import React from "react"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { 
  FaTwitter, 
  FaFacebook, 
  FaLinkedin, 
  FaHospital, 
  FaUserMd, 
  FaAward, 
  FaHistory,
  FaChartLine,
  FaShieldAlt,
  FaUsers,
  FaHeartbeat,
  FaBrain,
  FaRobot,
  FaDatabase,
  FaChartBar,
  FaMobileAlt,
  FaDesktop,
  FaGlobe,
  FaStar,
  FaCheckCircle,
  FaArrowRight,
  FaPlay
} from "react-icons/fa"
import doctorAbout from "../assets/doctor4.jpg"
import member1 from "../assets/wiiq.jpg"
import member4 from "../assets/doctor5.jpg"
import boqol from "../assets/image2.jpg"
import karama from "../assets/img1.jpg"
import Header from "../components/header"
import Footer from "../components/footer"

const About = () => {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark")
  const [activeTab, setActiveTab] = useState("mission")
  const [activeFeature, setActiveFeature] = useState(0)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme")
    setDarkMode(theme === "dark")
  }, [])

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const slideIn = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8 },
    },
  }

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6 },
    },
  }

  const features = [
    {
      icon: <FaBrain className="text-6xl text-blue-500" />,
      title: "AI-Powered Analytics",
      description: "Advanced machine learning algorithms analyze patient data patterns to predict readmission risks with high accuracy."
    },
    {
      icon: <FaChartLine className="text-6xl text-teal-500" />,
      title: "Real-time Monitoring",
      description: "Continuous monitoring of patient vitals and health indicators to provide instant risk assessments."
    },
    {
      icon: <FaShieldAlt className="text-6xl text-purple-500" />,
      title: "Predictive Prevention",
      description: "Proactive intervention strategies based on predictive models to prevent unnecessary readmissions."
    },
    {
      icon: <FaDatabase className="text-6xl text-indigo-500" />,
      title: "Data Integration",
      description: "Seamless integration with existing hospital systems for comprehensive patient data analysis."
    }
  ]

  const stats = [
    { number: "94%", label: "Prediction Accuracy", icon: <FaChartBar /> },
    { number: "40%", label: "Reduction in Readmissions", icon: <FaHeartbeat /> },
    { number: "24/7", label: "Monitoring System", icon: <FaShieldAlt /> },
    { number: "500+", label: "Hospitals Served", icon: <FaHospital /> }
  ]

  const benefits = [
    "Reduced healthcare costs by 30%",
    "Improved patient satisfaction scores",
    "Enhanced clinical decision making",
    "Streamlined discharge planning",
    "Better resource allocation",
    "Increased bed availability"
  ]

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="w-full min-h-screen font-sans">
        {/* Hero Section */}
        <section
          className={`relative py-32 px-4 sm:px-6 lg:px-16 overflow-hidden ${darkMode ? "bg-gradient-to-br from-gray-800 via-blue-900 to-gray-900" : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"}`}
        >
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute top-40 left-40 w-80 h-80 bg-teal-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
          </div>

          <div className="container mx-auto relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
              <motion.div
                className="flex-1 space-y-8"
                initial="hidden"
                animate="visible"
                variants={slideIn}
              >
                <div className="space-y-4">
                  <motion.div
                    className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <FaRobot className="mr-2" />
                    System-Powered Healthcare Solutions
                  </motion.div>
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-teal-500">
                      Revolutionizing
                    </span>
                    <br />
                    <span className={`${darkMode ? "text-white" : "text-gray-900"}`}>
                      Hospital Care
                    </span>
                  </h1>
                  <p className="text-xl sm:text-2xl leading-relaxed max-w-3xl">
                    At <span className="font-bold text-blue-500">HRP MANAGEMENT</span>, we're pioneering the future of healthcare with our advanced AI-driven hospital readmission prediction system. Our cutting-edge technology helps healthcare providers deliver better patient outcomes while reducing costs.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsVideoModalOpen(true)}
                  >
                    <FaPlay className="mr-2" />
                    Watch Demo
                  </motion.button>
                  <motion.button
                    className={`px-8 py-4 border-2 rounded-full font-semibold text-lg transition-all duration-300 flex items-center justify-center ${
                      darkMode 
                        ? "border-white text-white hover:bg-white hover:text-gray-900" 
                        : "border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Learn More
                    <FaArrowRight className="ml-2" />
                  </motion.button>
                </div>
              </motion.div>

              <motion.div
                className="flex-1 relative"
                initial="hidden"
                animate="visible"
                variants={scaleIn}
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 rounded-2xl blur-xl opacity-30 animate-pulse"></div>
                <img
                  src={doctorAbout || "/placeholder.svg"}
                  alt="Doctor"
                  className="relative w-full max-w-[600px] h-auto rounded-2xl shadow-2xl object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className={`py-20 px-4 sm:px-6 lg:px-16 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
          <div className="container mx-auto">
            <motion.div
              className="grid grid-cols-2 lg:grid-cols-4 gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  variants={fadeIn}
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                    darkMode ? "bg-gray-700" : "bg-blue-100"
                  }`}>
                    <div className="text-2xl text-blue-500">{stat.icon}</div>
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold text-blue-500 mb-2">{stat.number}</div>
                  <div className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className={`py-24 px-4 sm:px-6 lg:px-16 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
          <div className="container mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-center mb-16"
            >
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500">
                  Advanced Features
                </span>
              </h2>
              <p className="max-w-3xl mx-auto text-xl">
                Our comprehensive hospital readmission prediction system combines cutting-edge AI technology with clinical expertise.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                className="space-y-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={slideIn}
              >
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className={`flex items-start space-x-6 p-6 rounded-2xl transition-all duration-300 hover:shadow-xl ${
                      darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-50"
                    }`}
                    variants={fadeIn}
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex-shrink-0">{feature.icon}</div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                      <p className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                className="relative"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={scaleIn}
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl blur-xl opacity-20"></div>
                <div className={`relative ${darkMode ? "bg-gray-800" : "bg-white"} rounded-2xl p-8 shadow-2xl`}>
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-center mb-8">How It Works</h3>
                    <div className="space-y-4">
                      {[
                        "Patient data collection and analysis",
                        "AI model processing and risk assessment",
                        "Real-time alerts and notifications",
                        "Clinical intervention recommendations",
                        "Outcome tracking and improvement"
                      ].map((step, index) => (
                        <div key={index} className="flex items-center space-x-4">
                          <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                            {index + 1}
                          </div>
                          <span className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                            {step}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className={`py-24 px-4 sm:px-6 lg:px-16 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
          <div className="container mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-center mb-16"
            >
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500">
                  Benefits for Healthcare
                </span>
              </h2>
              <p className="max-w-3xl mx-auto text-xl">
                Discover how our AI-powered system transforms hospital operations and patient care.
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className={`${darkMode ? "bg-gray-700" : "bg-gray-50"} rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300`}
                  variants={fadeIn}
                  whileHover={{ y: -10 }}
                >
                  <div className="flex items-center space-x-4">
                    <FaCheckCircle className="text-3xl text-green-500 flex-shrink-0" />
                    <span className="text-lg font-semibold">{benefit}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Hospital System Info */}
        <section className={`py-24 px-4 sm:px-6 lg:px-16 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
          <div className="container mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-center mb-16"
            >
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500">
                  Our Hospital Network
                </span>
              </h2>
              <p className="max-w-3xl mx-auto text-xl">
                A comprehensive healthcare network delivering excellence across multiple facilities with state-of-the-art technology.
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                {
                  icon: <FaHospital className="text-5xl text-blue-500" />,
                  title: "5 Modern Facilities",
                  desc: "State-of-the-art hospitals across the region",
                  stat: "500+ beds"
                },
                {
                  icon: <FaUserMd className="text-5xl text-teal-500" />,
                  title: "200+ Specialists",
                  desc: "Expert doctors in every medical field",
                  stat: "24/7 care"
                },
                {
                  icon: <FaAward className="text-5xl text-purple-500" />,
                  title: "Award Winning",
                  desc: "Recognized for healthcare excellence",
                  stat: "15+ awards"
                },
                {
                  icon: <FaHistory className="text-5xl text-indigo-500" />,
                  title: "15+ Years Experience",
                  desc: "Dedicated service to patient care",
                  stat: "50k+ patients"
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className={`${darkMode ? "bg-gray-800" : "bg-white"} rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300`}
                  variants={fadeIn}
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                  <div className="text-center">
                    <div className="mb-6 p-4 rounded-full bg-opacity-10 bg-blue-100 inline-block">{item.icon}</div>
                    <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                    <p className={`${darkMode ? "text-gray-300" : "text-gray-600"} mb-4 text-lg`}>{item.desc}</p>
                    <div className="text-2xl font-bold text-blue-500">{item.stat}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className={`py-24 px-4 sm:px-6 lg:px-16 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
          <div className="container mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-center mb-12"
            >
              <h2 className="text-4xl sm:text-5xl font-bold mb-8">Our Mission & Vision</h2>

              <div className="flex justify-center space-x-4 mb-12">
                <button
                  onClick={() => setActiveTab("mission")}
                  className={`px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 ${
                    activeTab === "mission"
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                      : darkMode
                        ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Mission
                </button>
                <button
                  onClick={() => setActiveTab("vision")}
                  className={`px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 ${
                    activeTab === "vision"
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                      : darkMode
                        ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Vision
                </button>
              </div>
            </motion.div>

            <div className="flex justify-center">
              <motion.div
                className={`max-w-4xl ${darkMode ? "bg-gray-700" : "bg-gray-50"} rounded-3xl shadow-2xl p-12`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                key={activeTab}
              >
                {activeTab === "mission" ? (
                  <div className="text-center">
                    <div className="mb-8">
                      <FaHeartbeat className="text-6xl text-blue-500 mx-auto mb-4" />
                      <h3 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500">
                        Our Mission
                      </h3>
                    </div>
                    <p className="text-xl leading-relaxed">
                      To revolutionize healthcare delivery through innovative AI-powered predictive analytics. We are committed to reducing hospital readmissions by 40% while improving patient outcomes and healthcare efficiency. Our mission is to empower healthcare providers with actionable insights that enable proactive, personalized care for every patient.
                    </p>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="mb-8">
                      <FaGlobe className="text-6xl text-purple-500 mx-auto mb-4" />
                      <h3 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500">
                        Our Vision
                      </h3>
                    </div>
                    <p className="text-xl leading-relaxed">
                      To become the global leader in AI-driven healthcare solutions, creating a future where predictive medicine is the standard of care. We envision a healthcare ecosystem where every hospital leverages intelligent analytics to deliver proactive, personalized care that prevents complications before they occur, ultimately improving the quality of life for millions of patients worldwide.
                    </p>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>


        {/* Team Section */}
        <section className={`py-24 px-4 sm:px-6 lg:px-16 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
          <div className="container mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-center mb-16"
            >
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500">
                  Meet Our Expert Team
                </span>
              </h2>
              <p className="max-w-3xl mx-auto text-xl">
                The brilliant minds behind our innovative hospital readmission prediction system.
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                { 
                  name: "FEYSAL MOHAMED DAHIR", 
                  role: "Chief Medical Officer", 
                  image: member1,
                  expertise: "Clinical Strategy & Patient Care"
                },
                { 
                  name: "MOHAMED BASHI ADAM", 
                  role: "Data Science Director", 
                  image: karama,
                  expertise: "AI & Machine Learning"
                },
                { 
                  name: "MOHAMED ABDALLE WARSAME", 
                  role: "Clinical Integration Lead", 
                  image: boqol,
                  expertise: "Healthcare Systems"
                },
                { 
                  name: "MOHAMED ABDIKADIR MOHAMUD", 
                  role: "Healthcare Analytics Expert", 
                  image: member4,
                  expertise: "Predictive Analytics"
                },
              ].map((member, index) => (
                <motion.div
                  key={index}
                  className={`${darkMode ? "bg-gray-700" : "bg-white"} rounded-2xl shadow-xl overflow-hidden group`}
                  variants={fadeIn}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-72 object-cover object-center transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-6 w-full">
                        <div className="flex justify-center gap-4 text-white text-2xl mb-4">
                          <FaTwitter className="cursor-pointer hover:text-blue-400 transition hover:scale-110" />
                          <FaFacebook className="cursor-pointer hover:text-blue-400 transition hover:scale-110" />
                          <FaLinkedin className="cursor-pointer hover:text-blue-400 transition hover:scale-110" />
                        </div>
                        <p className="text-white text-center text-sm">{member.expertise}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="font-bold text-xl mb-2">{member.name}</h3>
                    <p className={`${darkMode ? "text-gray-300" : "text-gray-600"} font-medium`}>{member.role}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={`py-24 px-4 sm:px-6 lg:px-16 ${darkMode ? "bg-gradient-to-r from-blue-900 to-purple-900" : "bg-gradient-to-r from-blue-600 to-purple-600"}`}>
          <div className="container mx-auto text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                Ready to Transform Your Hospital?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Join hundreds of hospitals already using our AI-powered readmission prediction system to improve patient outcomes and reduce costs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  className="px-8 py-4 bg-white text-blue-600 rounded-full font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started Today
                </motion.button>
                <motion.button
                  className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Schedule Demo
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer Component */}
        <Footer darkMode={darkMode} />
      </div>
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
    </div>
  )
}

export default About
