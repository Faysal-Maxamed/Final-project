import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaHeartbeat, 
  FaArrowRight, 
  FaAppleAlt, 
  FaRunning, 
  FaBed, 
  FaWater, 
  FaBrain,
  FaMedkit,
  FaCalendarCheck,
  FaClipboardList,
  FaUserFriends,
  FaPhoneAlt,
  FaSmile,
  FaLeaf,
  FaBook,
  FaHands
} from 'react-icons/fa';

const HealthTips = ({ darkMode }) => {
  const [activeTab, setActiveTab] = useState('general');

  const tips = {
    general: [
      {
        icon: <FaHeartbeat />,
        title: "Regular Health Check-ups",
        description: "Schedule routine check-ups with your healthcare provider to monitor your health status and catch potential issues early.",
        color: "from-red-500 to-pink-500"
      },
      {
        icon: <FaAppleAlt />,
        title: "Balanced Diet",
        description: "Maintain a diet rich in fruits, vegetables, lean proteins, and whole grains to support overall health and immune function.",
        color: "from-green-500 to-emerald-500"
      },
      {
        icon: <FaRunning />,
        title: "Regular Exercise",
        description: "Aim for at least 150 minutes of moderate physical activity per week to improve cardiovascular health and mental wellbeing.",
        color: "from-blue-500 to-cyan-500"
      },
      {
        icon: <FaBed />,
        title: "Quality Sleep",
        description: "Prioritize 7-9 hours of quality sleep per night to allow your body to recover and maintain optimal cognitive function.",
        color: "from-indigo-500 to-purple-500"
      },
      {
        icon: <FaWater />,
        title: "Stay Hydrated",
        description: "Drink at least 8 glasses of water daily to maintain proper bodily functions and support energy levels.",
        color: "from-amber-500 to-orange-500"
      }
    ],
    readmission: [
      {
        icon: <FaMedkit />,
        title: "Medication Adherence",
        description: "Take all prescribed medications exactly as directed by your healthcare provider to prevent complications.",
        color: "from-red-500 to-pink-500"
      },
      {
        icon: <FaCalendarCheck />,
        title: "Follow-up Appointments",
        description: "Attend all scheduled follow-up appointments to monitor your recovery progress and address any concerns.",
        color: "from-blue-500 to-cyan-500"
      },
      {
        icon: <FaClipboardList />,
        title: "Understand Discharge Instructions",
        description: "Make sure you fully understand all discharge instructions before leaving the hospital, including warning signs to watch for.",
        color: "from-green-500 to-emerald-500"
      },
      {
        icon: <FaUserFriends />,
        title: "Support System",
        description: "Establish a support system of family or friends who can assist with your recovery and transportation to appointments.",
        color: "from-purple-500 to-violet-500"
      },
      {
        icon: <FaPhoneAlt />,
        title: "Early Symptom Reporting",
        description: "Contact your healthcare provider immediately if you experience any concerning symptoms rather than waiting until they worsen.",
        color: "from-amber-500 to-orange-500"
      }
    ],
    mental: [
      {
        icon: <FaBrain />,
        title: "Stress Management",
        description: "Practice stress-reduction techniques such as meditation, deep breathing, or yoga to improve mental wellbeing.",
        color: "from-purple-500 to-violet-500"
      },
      {
        icon: <FaSmile />,
        title: "Social Connection",
        description: "Maintain meaningful social connections with friends and family to support emotional health and reduce isolation.",
        color: "from-blue-500 to-cyan-500"
      },
      {
        icon: <FaLeaf />,
        title: "Time in Nature",
        description: "Spend time outdoors in natural settings to reduce stress, improve mood, and enhance overall mental health.",
        color: "from-green-500 to-emerald-500"
      },
      {
        icon: <FaBook />,
        title: "Continuous Learning",
        description: "Engage in lifelong learning and mentally stimulating activities to maintain cognitive function and brain health.",
        color: "from-amber-500 to-orange-500"
      },
      {
        icon: <FaHands />,
        title: "Seek Help When Needed",
        description: "Don't hesitate to reach out to mental health professionals if you're experiencing persistent negative emotions or thoughts.",
        color: "from-red-500 to-pink-500"
      }
    ]
  };

  return (
    <section className={`py-16 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
            Health Tips & <span className="text-blue-600">Recommendations</span>
          </h2>
          <p className={`max-w-3xl mx-auto ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Practical advice to improve your health outcomes and reduce the risk of hospital readmission.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className={`inline-flex p-1 rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"} shadow-md`}>
            {['general', 'readmission', 'mental'].map((tab) => (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === tab
                    ? `bg-blue-600 text-white shadow-md`
                    : `${darkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-600 hover:text-gray-900"}`
                }`}
                whileHover={{ scale: activeTab !== tab ? 1.05 : 1 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tips[activeTab].map((tip, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`rounded-xl overflow-hidden shadow-lg ${
                darkMode ? "bg-gray-800 hover:bg-gray-750" : "bg-white hover:bg-gray-50"
              } transition-all duration-300 group`}
            >
              <div className={`h-2 bg-gradient-to-r ${tip.color}`}></div>
              <div className="p-6">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${tip.color} flex items-center justify-center text-white text-xl mb-4`}>
                  {tip.icon}
                </div>
                <h3 className={`text-xl font-semibold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  {tip.title}
                </h3>
                <p className={`mb-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  {tip.description}
                </p>
                <a
                  href="#"
                  className={`inline-flex items-center text-sm font-medium ${
                    darkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"
                  }`}
                >
                  Learn more <FaArrowRight className="ml-2 text-xs transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className={`mt-12 p-8 rounded-xl text-center ${
            darkMode ? "bg-gray-800" : "bg-white"
          } shadow-lg max-w-3xl mx-auto`}
        >
          <h3 className={`text-xl font-bold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
            Need personalized health advice?
          </h3>
          <p className={`mb-6 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Our healthcare professionals can provide tailored recommendations based on your specific health needs.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all shadow-md"
          >
            Contact Us <FaArrowRight className="ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default HealthTips;
