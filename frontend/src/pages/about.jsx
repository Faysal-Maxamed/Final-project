import React from "react"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { FaTwitter, FaFacebook, FaLinkedin, FaHospital, FaUserMd, FaAward, FaHistory } from "react-icons/fa"
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

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="w-full min-h-screen font-sans">
        {/* Hero Section */}
        <section
          className={`relative py-20 px-4 sm:px-6 lg:px-16 overflow-hidden ${darkMode ? "bg-gradient-to-br from-gray-800 to-gray-900" : "bg-gradient-to-br from-blue-50 to-indigo-50"}`}
        >
          <div className="absolute inset-0 overflow-hidden opacity-10">
            <svg className="h-full w-full" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke={darkMode ? "white" : "blue"} strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-12">
              <motion.div
                className="max-w-2xl space-y-6 text-left"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500">
                    About
                  </span>
                  <span className={`${darkMode ? "text-white" : "text-gray-900"}`}> Us</span>
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl leading-relaxed">
                  At <span className="font-bold text-blue-500">HRP MANAGEMENT</span>, we specialize in hospital
                  readmission prediction using AI-driven machine learning models. Our advanced algorithms analyze
                  patient data to identify patterns and risk factors, enabling healthcare providers to implement
                  proactive measures. By leveraging predictive analytics, we aim to reduce unnecessary readmissions,
                  improve patient outcomes, and enhance the overall efficiency of healthcare systems.
                </p>
              </motion.div>

              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg blur-lg opacity-30 animate-pulse"></div>
                <img
                  src={doctorAbout || "/placeholder.svg"}
                  alt="Doctor"
                  className="relative w-full max-w-[500px] h-auto rounded-lg shadow-2xl object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Hospital System Info */}
        <section className={`py-24 px-4 sm:px-6 lg:px-16 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
          <div className="container mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500">
                  Our Hospital System
                </span>
              </h2>
              <p className="max-w-3xl mx-auto text-lg">
                Established in 2010, our hospital system has grown to become a leading healthcare provider with
                state-of-the-art facilities and cutting-edge technology.
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
                  icon: <FaHospital className="text-blue-500 text-4xl" />,
                  title: "5 Facilities",
                  desc: "Modern hospitals across the region",
                },
                {
                  icon: <FaUserMd className="text-teal-500 text-4xl" />,
                  title: "200+ Specialists",
                  desc: "Expert doctors in every field",
                },
                {
                  icon: <FaAward className="text-indigo-500 text-4xl" />,
                  title: "Award Winning",
                  desc: "Recognized for excellence in healthcare",
                },
                {
                  icon: <FaHistory className="text-purple-500 text-4xl" />,
                  title: "15+ Years",
                  desc: "Of dedicated service to patients",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className={`${darkMode ? "bg-gray-700" : "bg-gray-50"} rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300`}
                  variants={fadeIn}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4 p-4 rounded-full bg-opacity-10 bg-blue-100">{item.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className={`py-24 px-4 sm:px-6 lg:px-16 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
          <div className="container mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8">Our Mission & Vision</h2>

              <div className="flex justify-center space-x-4 mb-8">
                <button
                  onClick={() => setActiveTab("mission")}
                  className={`px-6 py-2 rounded-full text-lg font-medium transition-all duration-300 ${
                    activeTab === "mission"
                      ? "bg-blue-500 text-white shadow-lg"
                      : darkMode
                        ? "bg-gray-800 text-gray-300"
                        : "bg-gray-200 text-gray-700"
                  }`}
                >
                  Mission
                </button>
                <button
                  onClick={() => setActiveTab("vision")}
                  className={`px-6 py-2 rounded-full text-lg font-medium transition-all duration-300 ${
                    activeTab === "vision"
                      ? "bg-blue-500 text-white shadow-lg"
                      : darkMode
                        ? "bg-gray-800 text-gray-300"
                        : "bg-gray-200 text-gray-700"
                  }`}
                >
                  Vision
                </button>
              </div>
            </motion.div>

            <div className="flex justify-center">
              <motion.div
                className={`max-w-3xl ${darkMode ? "bg-gray-800" : "bg-white"} rounded-2xl shadow-xl p-10`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                key={activeTab}
              >
                {activeTab === "mission" ? (
                  <div className="text-center">
                    <h3 className="text-3xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500">
                      Our Mission
                    </h3>
                    <p className="text-xl">
                      Providing better healthcare through predictive technology. We are committed to revolutionizing
                      patient care by leveraging advanced analytics to identify at-risk patients before complications
                      arise. Our mission is to empower healthcare providers with actionable insights that reduce
                      readmissions, improve patient outcomes, and optimize healthcare resources.
                    </p>
                  </div>
                ) : (
                  <div className="text-center">
                    <h3 className="text-3xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500">
                      Our Vision
                    </h3>
                    <p className="text-xl">
                      Driving healthcare innovation for a smarter hospital system. We envision a future where predictive
                      analytics seamlessly integrates with clinical workflows, creating a proactive healthcare ecosystem
                      that anticipates patient needs. Our vision is to establish a new standard in healthcare delivery
                      where data-driven decisions lead to more personalized care, reduced costs, and improved health
                      outcomes for all.
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
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500">
                  Our Team Members
                </span>
              </h2>
              <p className="max-w-3xl mx-auto text-lg">
                Meet the dedicated professionals behind our innovative hospital readmission prediction system.
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
                { name: "FEYSAL MOHAMED DAHIR", role: "Chief Medical Officer", image: member1 },
                { name: "MOHAMED BASHI ADAM", role: "Data Science Director", image: karama },
                { name: "MOHAMED ABDALLE WARSAME", role: "Clinical Integration Lead", image: boqol },
                { name: "MOHAMED ABDIKADIR MOHAMUD", role: "Healthcare Analytics Expert", image: member4 },
              ].map((member, index) => (
                <motion.div
                  key={index}
                  className={`${darkMode ? "bg-gray-700" : "bg-white"} rounded-xl shadow-lg overflow-hidden`}
                  variants={fadeIn}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                >
                  <div className="relative overflow-hidden group">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-64 object-cover object-center transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-4 w-full">
                        <div className="flex justify-center gap-4 text-white text-xl">
                          <FaTwitter className="cursor-pointer hover:text-blue-400 transition hover:scale-110" />
                          <FaFacebook className="cursor-pointer hover:text-blue-400 transition hover:scale-110" />
                          <FaLinkedin className="cursor-pointer hover:text-blue-400 transition hover:scale-110" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="font-bold text-xl mb-1">{member.name}</h3>
                    <p className={`${darkMode ? "text-gray-300" : "text-gray-600"} mb-4`}>{member.role}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Footer Component */}
        <Footer darkMode={darkMode} />
      </div>
    </div>
  )
}

export default About
