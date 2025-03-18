import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import doctor1 from "../assets/doc1.png";
import doctor2 from "../assets/doc2.png";
import doctor3 from "../assets/doc3.png";
import doctor4 from "../assets/doctor4.jpg"; // Additional doctor image
import { FaHospitalUser, FaCheckCircle, FaHandsHelping, FaHeartbeat, FaStethoscope } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";

const images = [doctor1, doctor2, doctor3];

const Homepage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const [showFullText, setShowFullText] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("bg-gray-900", "text-white");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("bg-gray-900", "text-white");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const shortText =
    "Advanced hospital readmission prediction using machine learning. Our AI-driven system helps hospitals prevent unnecessary readmissions...";
  const fullText =
    "In recent years, the healthcare sector has seen a significant shift towards leveraging technology for improving patient outcomes. One of the most promising advancements is the application of machine learning (ML) algorithms in predicting hospital readmissions. By analyzing vast amounts of patient data, including demographics, medical history, and treatment plans, these algorithms can identify patterns and risk factors that lead to readmission. This predictive capability enables healthcare providers to intervene proactively while allowing personalized care strategies tailored to individual patient needs.";

  return (
    <div className={`w-full min-h-screen font-sans ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      
      {/* Hero Section */}
      <header className={`flex flex-col md:flex-row items-center justify-between py-20 px-16 gap-12 ${darkMode ? 'bg-gray-800' : 'bg-teal-100'}`}>
        <div className="max-w-2xl space-y-8 text-left">
          <h1 className="text-6xl font-extrabold text-gray-900 leading-tight flex items-center gap-3">
            <FaHospitalUser className="text-blue-600 text-7xl" />
            Take Care of Your Health
          </h1>
          <p className={`text-2xl ${darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
            {showFullText ? fullText : shortText}
          </p>
          <button
            className="px-8 py-4 text-2xl bg-blue-700 text-white rounded-full shadow-md hover:bg-blue-800 transition duration-300"
            onClick={() => setShowFullText(!showFullText)}
          >
            {showFullText ? "Show Less" : "Learn More"}
          </button>
        </div>
        <div className="flex gap-5">
          {images.map((img, index) => (
            <motion.img
              key={index}
              src={img}
              alt={`Doctor ${index + 1}`}
              className="rounded-xl object-cover"
              style={{ width: "150px", height: "290px" }}
              animate={{
                scale: index === activeIndex ? 1.2 : 0.9,
                opacity: index === activeIndex ? 1 : 0.5,
              }}
              transition={{ duration: 0.8 }}
            />
          ))}
        </div>
      </header>

      {/* What We Do Section */}
      <section className={`py-24 ${darkMode ? 'bg-gray-800' : 'bg-white'} text-center px-12`}>
        <h2 className={`text-5xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-12`}>What We Do?</h2>
        <div className="grid md:grid-cols-3 gap-12">
          {[
            { icon: <FaHandsHelping className="text-blue-600 text-6xl" />, title: "Concise & Direct", desc: "We provide clear readmission insights." },
            { icon: <FaHeartbeat className="text-red-500 text-6xl" />, title: "Outcome Focused", desc: "Helping hospitals prevent unnecessary readmissions." },
            { icon: <FaStethoscope className="text-green-500 text-6xl" />, title: "Mission-Oriented", desc: "Providing actionable insights for better care." }
          ].map((item, index) => (
            <div key={index} className={`bg-white shadow-lg p-10 max-w-sm rounded-xl transition hover:scale-105 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-blue-50'}`}>
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-3xl font-semibold text-gray-800">{item.title}</h3>
              <p className="text-gray-600 mt-4 text-xl">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className={`bg-gray-100 py-24 text-center px-12 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className={`text-5xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-12`}>How It Works</h2>
        <div className="grid md:grid-cols-3 gap-12">
          {[
            { icon: <FaCheckCircle className="text-purple-500 text-6xl" />, step: "Data Collection", desc: "We collect patient medical records." },
            { icon: <FaCheckCircle className="text-blue-600 text-6xl" />, step: "Data Processing", desc: "AI cleans and prepares the data." },
            { icon: <FaCheckCircle className="text-green-500 text-6xl" />, step: "Prediction Model", desc: "Our algorithm predicts readmission risks." }
          ].map((item, index) => (
            <div key={index} className={`bg-white shadow-lg p-10 max-w-sm rounded-xl transition hover:scale-105 ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-3xl font-semibold flex items-center gap-4 text-gray-800">{item.step}</h3>
              <p className="text-gray-600 mt-4 text-xl">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial Section */}
      <section className={`py-24 text-center px-12 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <h2 className={`text-5xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>What Patients Say?</h2>
        <div className="mt-12 max-w-3xl mx-auto bg-white shadow-lg p-12 rounded-xl flex flex-col md:flex-row items-center gap-8 transition hover:scale-105 hover:bg-blue-50">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Patient"
            className="w-28 h-28 rounded-full border-4 border-blue-600 shadow-lg object-cover"
          />
          <div className="text-left">
            <p className={`text-gray-600 italic text-2xl leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              "HRP Management has significantly improved our hospital’s ability to predict and prevent readmissions. Their AI-driven insights have made patient care more effective and proactive."
            </p>
            <h3 className="mt-6 font-bold text-3xl text-gray-900">Pheyzal Mohamed</h3>
            <p className="text-blue-600 text-xl font-medium">Recovered Patient</p>
          </div>
        </div>
      </section>

      <Footer darkMode={darkMode} />
    </div>
  );
};

export default Homepage;