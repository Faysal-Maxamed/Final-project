import React, { useState } from "react";
import { FaHospitalUser, FaCheckCircle, FaHandsHelping, FaHeartbeat, FaStethoscope } from "react-icons/fa";
import doctor3 from "../assets/doctor4.jpg"; // Sawirka doctor
import Header from "../components/header";

const Homepage = () => {
  const [showFullText, setShowFullText] = useState(false);

  const shortText =
    "Advanced hospital readmission prediction using machine learning. Our AI-driven system helps hospitals prevent unnecessary readmissions...";
  const fullText =
    "In recent years, the healthcare sector has seen a significant shift towards leveraging technology for improving patient outcomes. One of the most promising advancements is the application of machine learning (ML) algorithms in predicting hospital readmissions. By analyzing vast amounts of patient data, including demographics, medical history, and treatment plans, these algorithms can identify patterns and risk factors that lead to readmission. This predictive capability enables healthcare providers to intervene proactively while allowing personalized care strategies tailored to individual patient needs.";

  return (
    <div className="w-full min-h-screen font-sans bg-gray-50">
      <Header/>  
      {/* Hero Section */}
      <header className="flex flex-col md:flex-row items-center justify-between py-20 px-16 gap-12">
        <div className="max-w-2xl space-y-8 text-left">
          <h1 className="text-6xl font-extrabold text-gray-900 leading-tight flex items-center gap-3">
            <FaHospitalUser className="text-blue-600 text-7xl" />
            Take Care of Your Health
          </h1>
          <p className="text-2xl text-gray-700 leading-relaxed">
            {showFullText ? fullText : shortText}
          </p>
          <button
            className="px-8 py-4 text-2xl bg-blue-700 text-white rounded-full shadow-md hover:bg-blue-800 transition duration-300"
            onClick={() => setShowFullText(!showFullText)}
          >
            {showFullText ? "Show Less" : "Learn More"}
          </button>
        </div>
        <div>
          <img
            src={doctor3}
            alt="Doctor"
            className="w-[850px] h-[650px] rounded-xl shadow-lg object-cover"
          />
        </div>
      </header>

      {/* What We Do Section */}
      <section className="py-24 bg-white text-center px-12">
        <h2 className="text-5xl font-bold text-gray-900 mb-12">What We Do?</h2>
        <div className="grid md:grid-cols-3 gap-12">
          {[
            { icon: <FaHandsHelping className="text-blue-600 text-6xl" />, title: "Concise & Direct", desc: "We provide clear readmission insights." },
            { icon: <FaHeartbeat className="text-red-500 text-6xl" />, title: "Outcome Focused", desc: "Helping hospitals prevent unnecessary readmissions." },
            { icon: <FaStethoscope className="text-green-500 text-6xl" />, title: "Mission-Oriented", desc: "Providing actionable insights for better care." }
          ].map((item, index) => (
            <div key={index} className="bg-gray-100 shadow-lg p-10 max-w-sm rounded-xl transition hover:scale-105 hover:bg-blue-50">
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-3xl font-semibold text-gray-800">{item.title}</h3>
              <p className="text-gray-600 mt-4 text-xl">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-100 py-24 text-center px-12">
        <h2 className="text-5xl font-bold text-gray-900 mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-12">
          {[
            { icon: <FaCheckCircle className="text-purple-500 text-6xl" />, step: "Data Collection", desc: "We collect patient medical records." },
            { icon: <FaCheckCircle className="text-blue-600 text-6xl" />, step: "Data Processing", desc: "AI cleans and prepares the data." },
            { icon: <FaCheckCircle className="text-green-500 text-6xl" />, step: "Prediction Model", desc: "Our algorithm predicts readmission risks." }
          ].map((item, index) => (
            <div key={index} className="bg-white shadow-lg p-10 max-w-sm rounded-xl transition hover:scale-105 hover:bg-gray-50">
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-3xl font-semibold flex items-center gap-4 text-gray-800">{item.step}</h3>
              <p className="text-gray-600 mt-4 text-xl">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial Section */}
<section className="py-24 text-center px-12 bg-gray-50">
  <h2 className="text-5xl font-bold text-gray-900">What Patients Say?</h2>
  <div className="mt-12 max-w-3xl mx-auto bg-white shadow-lg p-12 rounded-xl flex flex-col md:flex-row items-center gap-8 transition hover:scale-105 hover:bg-blue-50">
    {/* Profile Image */}
    <img
      src="https://randomuser.me/api/portraits/men/32.jpg"
      alt="Patient"
      className="w-28 h-28 rounded-full border-4 border-blue-600 shadow-lg object-cover"
    />
    
    {/* Testimonial Content */}
    <div className="text-left">
      <p className="text-gray-600 italic text-2xl leading-relaxed">
        "HRP Management has significantly improved our hospital’s ability to predict and prevent readmissions. Their AI-driven insights have made patient care more effective and proactive."
      </p>
      <h3 className="mt-6 font-bold text-3xl text-gray-900">Pheyzal Mohamed</h3>
      <p className="text-blue-600 text-xl font-medium">Recovered Patient</p>
    </div>
  </div>
</section>


      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center p-8 text-2xl">
        <p>&copy; 2025 HRP MANAGEMENT. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Homepage;