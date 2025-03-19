import React, { useEffect, useState } from "react";
import { FaTwitter, FaFacebook, FaLinkedin } from "react-icons/fa";
import doctorAbout from "../assets/doctor4.jpg";
import member1 from "../assets/wiiq.jpg";

import member4 from "../assets/doctor5.jpg";
import boqol from "../assets/image2.jpg";
import karama from "../assets/img1.jpg";
import Header from "../components/Header";
import Footer from "../components/Footer"; // ✅ Import Footer

const About = () => {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    setDarkMode(theme === "dark");
  }, []);

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="w-full min-h-screen font-sans">
        
        {/* About Us Section */}
        <section className="relative flex flex-col md:flex-row-reverse md:items-center justify-between py-20 px-16 gap-6 rounded-lg shadow-md">
          <div className="max-w-2xl space-y-6 text-left">
            <h1 className="text-6xl font-extrabold text-blue-500 leading-tight">
              About <span className={`${darkMode ? "text-white" : "text-gray-900"}`}>Us</span>
            </h1>
            <p className="text-2xl leading-relaxed">
              At <span className="font-bold text-blue-500">HRP MANAGEMENT</span>, we specialize in hospital readmission prediction using AI-driven machine learning models. Our advanced algorithms analyze patient data to identify patterns and risk factors, enabling healthcare providers to implement proactive measures. By leveraging predictive analytics, we aim to reduce unnecessary readmissions, improve patient outcomes, and enhance the overall efficiency of healthcare systems. Our commitment to innovation and data-driven solutions empowers hospitals to deliver better care and optimize their resources effectively.
            </p>
          </div>
          <div className="relative">
            <img
              src={doctorAbout}
              alt="Doctor"
              className="w-[700px] h-[500px] rounded-lg shadow-lg object-cover transform transition duration-700 hover:scale-105"
            />
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="py-24 text-center px-12">
            <h2 className="text-5xl font-bold mb-8">Our Mission & Vision</h2>
            <div className="mt-8 flex flex-wrap justify-center gap-10">
                <div className={`${darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"} shadow-lg p-10 max-w-sm rounded-xl transition hover:scale-105 transform hover:shadow-2xl`}>
                    <h3 className="text-3xl font-semibold">Our Mission</h3>
                    <p className="mt-4 text-xl">
                        Providing better healthcare through predictive technology.
                    </p>
                </div>
                <div className={`${darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"} shadow-lg p-10 max-w-sm rounded-xl transition hover:scale-105 transform hover:shadow-2xl`}>
                    <h3 className="text-3xl font-semibold">Our Vision</h3>
                    <p className="mt-4 text-xl">
                        Driving healthcare innovation for a smarter hospital system.
                    </p>
                </div>
            </div>
        </section>

        {/* Team Section */}
        <section className="container mx-auto py-24 text-center px-8">
            <h2 className="text-5xl font-bold mb-12 text-gray-900 dark:text-white">Our Team Members</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {[
                    { name: "FEYSAL MOHAMED DAHIR", image: member1 },
                    { name: "MOHAMED BASHI ADAM", image: karama },
                    { name: "MOHAMED ABDALLE WARSAME ", image: boqol },
                    { name: "MOHAMED ABDIKADIR MOHAMUD", image: member4 }
                ].map((member, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 shadow-lg p-6 rounded-xl transition transform hover:scale-105 hover:shadow-2xl">
                        <img src={member.image} alt={member.name} className="w-40 h-40 rounded-full mx-auto shadow-md mb-4 hover:scale-110 transition duration-300" />
                        <h3 className="mt-4 font-bold text-2xl text-gray-900 dark:text-white">{member.name}</h3>
                        <div className="flex justify-center gap-4 mt-4 text-blue-500 text-2xl">
                            <FaTwitter className="cursor-pointer hover:text-blue-400 transition hover:scale-110" />
                            <FaFacebook className="cursor-pointer hover:text-blue-400 transition hover:scale-110" />
                            <FaLinkedin className="cursor-pointer hover:text-blue-400 transition hover:scale-110" />
                        </div>
                    </div>
                ))}
            </div>
        </section>

        {/* Footer Component */}
        <Footer />  {/* ✅ Calling the Footer here */}
      </div>
    </div>
  );
};

export default About;