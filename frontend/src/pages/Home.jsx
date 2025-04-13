
import React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import doctor1 from "../assets/doc1.png"
import doctor2 from "../assets/doc2.png"
import doctor3 from "../assets/doc3.png"
import { FaCheckCircle, FaHandsHelping, FaHeartbeat, FaStethoscope } from "react-icons/fa"
import Header from "../components/header"
import Footer from "../components/footer"


const images = [doctor1, doctor2, doctor3]

const Homepage = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark")
  const [showFullText, setShowFullText] = useState(false)

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
  `
    document.head.appendChild(styleSheet)

    return () => {
      document.head.removeChild(styleSheet)
    }
  }, [])

  const shortText =
    "Advanced hospital readmission prediction using machine learning. Our AI-driven system helps hospitals prevent unnecessary readmissions..."
  const fullText =
    "In recent years, the healthcare sector has seen a significant shift towards leveraging technology for improving patient outcomes. One of the most promising advancements is the application of machine learning (ML) algorithms in predicting hospital readmissions. By analyzing vast amounts of patient data, including demographics, medical history, and treatment plans, these algorithms can identify patterns and risk factors that lead to readmission. This predictive capability enables healthcare providers to intervene proactively while allowing personalized care strategies tailored to individual patient needs."

  return (
    <div className={`w-full min-h-screen font-sans ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Hero Section */}
      <header
        className={`relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8 ${darkMode ? "bg-gradient-to-br from-gray-800 to-gray-900" : "bg-gradient-to-br from-teal-50 to-blue-50"}`}
      >
        <div className="absolute inset-0 z-0 opacity-20">
          <svg className="h-full w-full" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke={darkMode ? "white" : "blue"}
                  strokeWidth="1"
                  opacity="0.2"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl space-y-8 text-left z-10">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500 leading-tight"
              >
                Take Care of Your Health
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className={`text-lg sm:text-xl md:text-2xl ${darkMode ? "text-gray-300" : "text-gray-700"} leading-relaxed`}
              >
                {showFullText ? fullText : shortText}
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="px-6 py-3 text-lg font-medium bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-300"
                onClick={() => setShowFullText(!showFullText)}
              >
                {showFullText ? "Show Less" : "Learn More"}
              </motion.button>
            </div>

            <div className="relative z-10 flex gap-3 sm:gap-5">
              {images.map((img, index) => (
                <motion.div
                  key={index}
                  className="relative rounded-2xl overflow-hidden shadow-2xl"
                  style={{
                    width: index === activeIndex ? "180px" : "150px",
                    height: index === activeIndex ? "320px" : "290px",
                  }}
                  animate={{
                    scale: index === activeIndex ? 1 : 0.9,
                    opacity: index === activeIndex ? 1 : 0.5,
                    y: index === activeIndex ? -10 : 0,
                  }}
                  transition={{ duration: 0.8 }}
                >
                  <img
                    src={img || "/placeholder.svg"}
                    alt={`Doctor ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {index === activeIndex && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="h-1 w-full bg-white/30 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-white"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* What We Do Section */}
      <section className={`py-24 ${darkMode ? "bg-gray-800" : "bg-white"} text-center px-4 sm:px-6 lg:px-8`}>
        <div className="container mx-auto max-w-7xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`text-4xl sm:text-5xl font-bold ${darkMode ? "text-white" : "text-gray-900"} mb-16`}
          >
            What We Do?
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaHandsHelping className="text-blue-600 text-5xl" />,
                title: "Concise & Direct",
                desc: "We provide clear readmission insights.",
              },
              {
                icon: <FaHeartbeat className="text-red-500 text-5xl" />,
                title: "Outcome Focused",
                desc: "Helping hospitals prevent unnecessary readmissions.",
              },
              {
                icon: <FaStethoscope className="text-green-500 text-5xl" />,
                title: "Mission-Oriented",
                desc: "Providing actionable insights for better care.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl ${darkMode ? "bg-gray-700 border border-gray-600" : "bg-white"}`}
              >
                <div
                  className={`h-2 ${index === 0 ? "bg-blue-600" : index === 1 ? "bg-red-500" : "bg-green-500"}`}
                ></div>
                <div className="p-8">
                  <div className="mb-6 flex justify-center">{item.icon}</div>
                  <h3 className={`text-2xl font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-800"}`}>
                    {item.title}
                  </h3>
                  <p className={`${darkMode ? "text-gray-300" : "text-gray-600"} text-lg`}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className={`py-24 text-center px-4 sm:px-6 lg:px-8 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
        <div className="container mx-auto max-w-7xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`text-4xl sm:text-5xl font-bold ${darkMode ? "text-white" : "text-gray-900"} mb-16`}
          >
            How It Works
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection line */}
            <div className="hidden md:block absolute top-1/2 left-[16.66%] right-[16.66%] h-1 bg-gradient-to-r from-purple-500 via-blue-600 to-green-500 transform -translate-y-1/2 z-0"></div>

            {[
              {
                icon: <FaCheckCircle className="text-purple-500 text-5xl" />,
                step: "Data Collection",
                desc: "We collect patient medical records.",
              },
              {
                icon: <FaCheckCircle className="text-blue-600 text-5xl" />,
                step: "Data Processing",
                desc: "AI cleans and prepares the data.",
              },
              {
                icon: <FaCheckCircle className="text-green-500 text-5xl" />,
                step: "Prediction Model",
                desc: "Our algorithm predicts readmission risks.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`relative z-10 ${darkMode ? "bg-gray-800 border border-gray-700" : "bg-white"} shadow-xl p-8 rounded-2xl transition-all duration-300 hover:shadow-2xl`}
              >
                <div className="relative">
                  <div
                    className={`w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center ${index === 0 ? "bg-purple-100" : index === 1 ? "bg-blue-100" : "bg-green-100"}`}
                  >
                    {item.icon}
                  </div>
                  <div className="absolute top-0 -right-2 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-700">
                    {index + 1}
                  </div>
                </div>
                <h3 className={`text-2xl font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-800"}`}>
                  {item.step}
                </h3>
                <p className={`${darkMode ? "text-gray-300" : "text-gray-600"} text-lg`}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
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
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500">Patients</span>{" "}
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
              <div className="w-[700px] h-[700px] rounded-full border-2 border-teal-500"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative z-10">
              {[
                {
                  name: "Sarah Johnson",
                  role: "Cardiac Patient",
                  image: "https://randomuser.me/api/portraits/women/32.jpg",
                  quote:
                    "The readmission prediction system gave me peace of mind during my recovery. My care team used the insights to create a personalized plan that kept me healthy at home.",
                  rating: 5,
                },
                {
                  name: "Michael Chen",
                  role: "Diabetes Patient",
                  image: "https://randomuser.me/api/portraits/men/54.jpg",
                  quote:
                    "As someone with complex health needs, I've been in and out of hospitals for years. This system helped identify risk factors I wasn't aware of and significantly reduced my hospital visits.",
                  rating: 5,
                },
                {
                  name: "Amina Hassan",
                  role: "Post-Surgery Patient",
                  image: "https://randomuser.me/api/portraits/women/45.jpg",
                  quote:
                    "After my surgery, I was worried about complications. The prediction system helped my doctors monitor my recovery and intervene early when issues arose. Truly revolutionary care.",
                  rating: 4,
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className={`relative rounded-2xl overflow-hidden shadow-xl ${
                    darkMode ? "bg-gray-800 border border-gray-700" : "bg-white"
                  }`}
                >
                  {/* Decorative top bar */}
                  <div className="h-2 bg-gradient-to-r from-blue-600 to-teal-500"></div>

                  <div className="p-8">
                    {/* Quote mark */}
                    <div className="absolute top-8 right-8 text-6xl opacity-10">
                      <svg
                        width="50"
                        height="50"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={darkMode ? "text-white" : "text-gray-800"}
                      >
                        <path
                          d="M11 7V11.2C11 12.8802 11 13.7202 10.673 14.362C10.3854 14.9265 9.92651 15.3854 9.36203 15.673C8.72022 16 7.88022 16 6.2 16H4.8C4.11984 16 3.77976 16 3.5 15.891C3.0787 15.7152 2.78483 15.4213 2.60899 15C2.5 14.7202 2.5 14.3802 2.5 13.7V7C2.5 6.0681 2.5 5.60215 2.69346 5.23463C2.8622 4.91384 3.13281 4.64323 3.45359 4.47449C3.82111 4.28103 4.28706 4.28103 5.21895 4.28103H8.28105C9.21294 4.28103 9.67889 4.28103 10.0464 4.47449C10.3672 4.64323 10.6378 4.91384 10.8065 5.23463C11 5.60215 11 6.0681 11 7Z"
                          fill="currentColor"
                        />
                        <path
                          d="M21.5 7V11.2C21.5 12.8802 21.5 13.7202 21.173 14.362C20.8854 14.9265 20.4265 15.3854 19.862 15.673C19.2202 16 18.3802 16 16.7 16H15.3C14.6198 16 14.2798 16 14 15.891C13.5787 15.7152 13.2848 15.4213 13.109 15C13 14.7202 13 14.3802 13 13.7V7C13 6.0681 13 5.60215 13.1935 5.23463C13.3622 4.91384 13.6328 4.64323 13.9536 4.47449C14.3211 4.28103 14.7871 4.28103 15.7189 4.28103H18.7811C19.7129 4.28103 20.1789 4.28103 20.5464 4.47449C20.8672 4.64323 21.1378 4.91384 21.3065 5.23463C21.5 5.60215 21.5 6.0681 21.5 7Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col h-full">
                      <p className={`text-lg italic mb-6 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                        "{testimonial.quote}"
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
                              src={testimonial.image || "/placeholder.svg"}
                              alt={testimonial.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className={`font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                              {testimonial.name}
                            </h4>
                            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                              {testimonial.role}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
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
                <div className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500 mb-2">
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
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-full text-lg font-medium shadow-lg hover:shadow-xl transform transition duration-300"
            >
              Read More Success Stories
            </motion.button>
          </div>
        </div>
      </section>
      <Footer darkMode={darkMode} />
    </div>
  )
}

export default Homepage
