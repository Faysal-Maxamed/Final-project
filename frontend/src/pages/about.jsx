import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa"; // ✅ Import icons
import doctor1 from "../assets/doctor1.jpeg";
import doctor2 from "../assets/doctor2.jpeg";
import doctor3 from "../assets/doctor3.jpeg";
import bgImage from "../assets/about.jpeg";
import backImage from "../assets/back1.jpeg"; // ✅ Import image properly

const About = () => {
    const [showMore, setShowMore] = useState(false);
    
    const doctors = [
        { name: "Dr. Sarah Johnson", specialty: "Cardiologist", image: doctor1 },
        { name: "Dr. James Smith", specialty: "Neurologist", image: doctor2 },
        { name: "Dr. Olivia Brown", specialty: "Pediatrician", image: doctor3 },
    ];

    return (
        <div className="bg-gray-100">
            {/* Hero Section */}
            <div
                className="relative bg-cover bg-center h-[400px] flex items-center justify-center"
                style={{ backgroundImage: `url(${bgImage})` }} // Ensure proper path
            >
                <div className="absolute inset-0  bg-opacity-50"></div>
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="relative text-center text-white px-4"
                >
                    <h1 className="text-5xl font-extrabold">About Our Hospital</h1>
                    <p className="text-lg mt-3 max-w-2xl mx-auto">
                        Providing world-class healthcare with compassion, innovation, and excellence.
                    </p>
                </motion.div>
            </div>

            {/* About Us Section */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <motion.img
                        src={backImage} // ✅ Fixed image path
                        alt="Hospital Readmission"
                        className="rounded-lg shadow-lg object-cover w-full h-80"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                    />
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <h2 className="text-3xl font-bold text-teal-600">Hospital Readmission Prediction</h2>
                        <p className="mt-4 text-gray-600">
                            Our hospital leverages cutting-edge AI-driven predictive models to assess patient readmission risks.
                            By analyzing medical history, treatment patterns, and real-time health data, we provide accurate
                            insights that help healthcare providers make informed decisions. This approach enhances patient care,
                            reduces unnecessary hospital stays, and optimizes resource allocation, ultimately improving overall
                            healthcare efficiency and patient outcomes.
                        </p>
                        {showMore && (
                            <p className="mt-4 text-gray-600">
                                Our predictive system continuously learns and adapts, integrating new medical research and patient data
                                to refine its accuracy. By leveraging AI and machine learning, hospitals can proactively manage high-risk
                                patients, personalize treatment plans, and improve long-term health outcomes.
                            </p>
                        )}
                        <button
                            className="mt-6 px-6 py-2 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700"
                            onClick={() => setShowMore(!showMore)}
                        >
                            {showMore ? "Show Less" : "Learn More"}
                        </button>
                    </motion.div>
                </div>
            </div>

            {/* Mission, Vision & Values */}
            <div className="bg-white py-12">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-teal-600">Our Mission & Vision</h2>
                    <div className="grid md:grid-cols-3 gap-8 mt-8">
                        {[
                            { title: "Our Mission", desc: "To provide the highest quality medical care with compassion and integrity." },
                            { title: "Our Vision", desc: "To be a globally recognized healthcare provider known for excellence." },
                            { title: "Our Values", desc: "Patient-Centered Care, Integrity & Transparency, Innovation & Excellence, Compassion & Commitment." }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                className="bg-gray-100 p-6 rounded-lg shadow-lg"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: index * 0.2 }}
                            >
                                <h3 className="text-xl font-bold text-teal-600">{item.title}</h3>
                                <p className="mt-2 text-gray-600">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
                        {/* Meet Our Doctors */}
                        <div className="max-w-7xl mx-auto px-6 py-12">
                <h2 className="text-3xl font-bold text-center text-teal-600">Meet Our Specialists</h2>
                <div className="grid md:grid-cols-3 gap-8 mt-8">
                    {doctors.map((doctor, index) => (
                        <motion.div
                            key={index}
                            className="bg-white p-6 shadow-lg rounded-lg text-center transition-transform transform hover:scale-105 hover:shadow-2xl"
                            whileHover={{ scale: 1.05 }}
                        >
                            <img
                                src={doctor.image}
                                alt={doctor.name}
                                className="w-32 h-32 mx-auto rounded-full shadow-md"
                            />
                            <h3 className="mt-4 text-xl font-bold text-teal-600">{doctor.name}</h3>
                            <p className="text-gray-600">{doctor.specialty}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            
            {/* Footer Section */}
            <footer className="bg-teal-600 text-white py-10">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
                    <div>
                        <h2 className="text-2xl font-bold">Hospital readmision Prediction</h2>
                        <p className="mt-3 text-gray-300">
                            Providing world-class healthcare with compassion, innovation, and excellence.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold">Quick Links</h3>
                        <ul className="mt-3 space-y-2 text-gray-300">
                            <li><a href="#" className="hover:text-blue-400">Home</a></li>
                            <li><a href="#" className="hover:text-blue-400">About Us</a></li>
                            <li><a href="#" className="hover:text-blue-400">Services</a></li>
                            <li><a href="#" className="hover:text-blue-400">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold">Contact Us</h3>
                        <p className="mt-3 text-gray-300">Taleh, Banadir, Somalia</p>
                        <p className="text-gray-300">Phone: +252 614 388 477</p>
                        <p className="text-gray-300">Email: info@hospital.com</p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold">Newsletter</h3>
                        <p className="mt-3 text-gray-400">Subscribe to receive the latest updates.</p>
                        <div className="mt-3 flex">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="p-2 rounded-l-md w-full text-gray-900"
                            />
                            <button className="bg-blue-600 px-4 py-2 rounded-r-md hover:bg-blue-700">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-10 text-center">
                    <h3 className="text-xl font-semibold">Follow Us</h3>
                    <div className="flex justify-center mt-4 space-x-4">
                        <FaFacebookF />
                        <FaTwitter />
                        <FaInstagram />
                        <FaLinkedinIn />
                    </div>
                </div>

                <div className="text-center mt-6 text-gray-300 text-sm">
                    &copy; {new Date().getFullYear()} Hospital Readmision Prediction. All rights reserved.
                </div>
            </footer>

        </div>
    );
};

export default About;
