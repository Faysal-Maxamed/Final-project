import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import doctor1 from "../assets/doc1.png";
import doctor2 from "../assets/doc2.png";
import doctor3 from "../assets/doc3.png";
import Header from "../components/Header";
import Footer from "../components/Footer";

const images = [doctor1, doctor2, doctor3];

const Homepage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");

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

  return (
    <div className={`w-full min-h-screen font-sans ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <header className={`flex flex-col md:flex-row items-center justify-between py-16 px-10 gap-10 ${darkMode ? 'bg-gray-800' : 'bg-teal-100'}`}>
        <div className="max-w-2xl space-y-6 text-left">
          <span className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-black'} bg-blue-600 px-4 py-2 rounded-xl`}>
            Experience
          </span>
          <h1 className={`text-5xl md:text-6xl font-extrabold ${darkMode ? 'text-white' : 'text-gray-900'} leading-tight`}>
            Take Care of Your Health
          </h1>
          <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
            Hospital Readmission Prediction System helps you take charge of your health by predicting the likelihood of hospital readmission and providing personalized recommendations to reduce risks.
          </p>
          <button className="px-6 py-3 text-xl bg-blue-700 text-white rounded-full shadow-md hover:bg-yellow-500 transition duration-300">
            Learn More →
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

      <section className={`py-16 px-10 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className={`text-4xl font-extrabold ${darkMode ? 'text-white' : 'text-gray-900'} text-center`}>
            What We Do?
          </h2>
          <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-700'} text-center`}>
            We predict hospital readmissions using machine learning and data analytics. Our solutions help healthcare providers identify at-risk patients, improve care, and reduce unnecessary readmissions.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Concise & Direct</h3>
              <p className="text-gray-700">
                We predict hospital readmissions using machine learning, helping healthcare providers improve care and reduce unnecessary returns.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Outcome-Focused</h3>
              <p className="text-gray-700">
                We help hospitals prevent avoidable readmissions by identifying at-risk patients early, improving care quality and reducing costs.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Mission-Oriented</h3>
              <p className="text-gray-700">
                Our goal is to enhance patient care by predicting readmissions before they happen, allowing hospitals to intervene effectively.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={`py-16 px-10 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className={`text-4xl font-extrabold ${darkMode ? 'text-white' : 'text-gray-900'} text-center`}>
            How it Works
          </h2>
          <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-700'} text-center`}>
            AI-powered insights to predict and prevent hospital readmissions
          </p>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">1</h3>
              <p className="text-gray-700">
                <strong>Data Collection</strong><br />
                We gather patient records, clinical history, and other relevant data
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">2</h3>
              <p className="text-gray-700">
                <strong>Data Processing</strong><br />
                Our system cleans and prepares the data for analysis
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">3</h3>
              <p className="text-gray-700">
                <strong>Prediction Model</strong><br />
                AI-driven algorithms assess the risk of readmission
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">4</h3>
              <p className="text-gray-700">
                <strong>Data Processing</strong><br />
                Our system cleans and prepares the data for analysis
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">5</h3>
              <p className="text-gray-700">
                <strong>Prediction Model</strong><br />
                AI-driven algorithms assess the risk of readmission
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={`py-16 px-10 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-10 items-center">
          <div className="w-[250px] h-[250px] bg-white shadow-lg flex flex-col items-center justify-center p-4">
            <img
              src={doctor1}
              alt="Doctor"
              className="w-24 h-24 rounded-full object-cover mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-900"> John Doe</h3>
            <h5 className="text-xl font-regular text-gray-400">Patient</h5>
          </div>

          <div className="flex-1 h-[250px] bg-white rounded-lg flex flex-col justify-center p-6">
            <h2 className="text-3xl font-bold text-blue-700 ">What patients say about HRP Management System?</h2>
            <p className="text-gray-400 text-lg mt-2">
              Our system predicts hospital readmissions using AI, helping hospitals improve patient outcomes and reduce costs.
            </p>
          </div>
        </div>

        <div className="flex ml-52 mt-6">
          <div className="relative bg-yellow-400 p-4 rounded-lg w-96">
            <p className="text-white text-center">
              Patients play a vital role in their recovery and overall health. Following medical advice, taking prescribed medications.
            </p>
            <div className="absolute -top-2 left-10 w-0 h-0 border-l-8 border-r-8 border-b-8 border-b-yellow-400 border-l-transparent border-r-transparent"></div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Homepage;