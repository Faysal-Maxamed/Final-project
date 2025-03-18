import React, { useEffect, useState } from "react";
import { FaTwitter, FaFacebook, FaLinkedin } from "react-icons/fa";
import doctorAbout from "../assets/aboutimg.png";
import member1 from "../assets/doctor5.jpg";
import member2 from "../assets/doctor5.jpg";
import member3 from "../assets/doctor5.jpg";
import member4 from "../assets/doctor5.jpg";
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
              At <span className="font-bold text-blue-500">HRP MANAGEMENT</span>, we specialize in hospital readmission prediction using AI-driven machine learning models.
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
            {[{ title: "Our Mission", desc: "Providing better healthcare through predictive technology." },
              { title: "Our Vision", desc: "Driving healthcare innovation for a smarter hospital system." }
            ].map((item, index) => (
              <div
                key={index}
                className={`${darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"} shadow-lg p-10 max-w-sm rounded-xl transition hover:scale-105 transform hover:shadow-2xl`}
              >
                <h3 className="text-3xl font-semibold">{item.title}</h3>
                <p className="mt-4 text-xl">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="py-24 text-center px-12">
          <h2 className="text-5xl font-bold mb-8">Our Team Members</h2>
          <div className="flex flex-wrap justify-center gap-10">
            {[{ name: "Mohamed Bashir", image: member1 },
              { name: "Ayaan Hassan", image: member2 },
              { name: "Abdi Ahmed", image: member3 },
              { name: "Fatima Noor", image: member4 }
            ].map((member, index) => (
              <div
                key={index}
                className={`${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"} shadow-lg p-6 max-w-xs rounded-xl transition hover:scale-105 transform hover:shadow-2xl`}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-36 h-36 rounded-full mx-auto shadow-md hover:scale-110 transition duration-300"
                />
                <h3 className="mt-6 font-bold text-2xl">{member.name}</h3>
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
