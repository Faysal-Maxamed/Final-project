import React, { useState, useEffect } from "react";
import { FaQuoteLeft, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import axios from "axios";

const FeedbackSection = ({ darkMode }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/feedback")
      .then((response) => {
        setFeedbacks(response.data.reverse()); // Reverse to show last feedback first
      })
      .catch((error) => {
        console.error("Error fetching feedback:", error);
      });
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === feedbacks.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? feedbacks.length - 1 : prevIndex - 1
    );
  };

  return (
    <section
      className={`py-24 text-center px-12 transition-all duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <h2 className="text-5xl font-bold">What Patients Say?</h2>
      <div
        className={`mt-12 max-w-3xl mx-auto shadow-lg p-12 rounded-xl flex flex-col gap-8 transition-all duration-300 ${
          darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-blue-50"
        }`}
      >
        {feedbacks.length > 0 ? (
          <div className="flex flex-col md:flex-row items-center gap-8">
            <img
              src={`https://randomuser.me/api/portraits/men/${currentIndex + 30}.jpg`}
              alt="Patient"
              className="w-28 h-28 rounded-full border-4 border-blue-600 shadow-lg object-cover"
            />
            <div className="text-left">
              <p
                className={`italic text-2xl leading-relaxed ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                <FaQuoteLeft className="inline text-blue-500 text-3xl mr-2" />
                "{feedbacks[currentIndex].feedback}"
              </p>
              <h3 className="mt-6 font-bold text-3xl">
                Anonymous Patient
              </h3>
              <p className="text-blue-600 text-xl font-medium">
                Rating: {feedbacks[currentIndex].rating} / 5
              </p>
            </div>
          </div>
        ) : (
          <p className="text-xl text-gray-500">No feedback available yet.</p>
        )}

        {/* Navigation Arrows */}
        <div className="flex justify-center mt-6 space-x-6">
          <button
            onClick={handlePrev}
            className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-700 transition-all"
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={handleNext}
            className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-700 transition-all"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeedbackSection;
