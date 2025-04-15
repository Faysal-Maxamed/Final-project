import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdFeedback } from "react-icons/md";

const Feedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [feedback, setFeedback] = useState("");
    const [rating, setRating] = useState(5);
    const [message, setMessage] = useState("");

    // Fetch feedbacks
    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/feedback"); // adjust URL if needed
                setFeedbacks(res.data);
            } catch (error) {
                console.error("Failed to fetch feedback:", error);
            }
        };

        fetchFeedbacks();
    }, []);

    // Submit feedback
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/feedback", { feedback, rating });
            setMessage(res.data.message);
            setFeedback("");
            setRating(5);
            setFeedbacks([res.data.feedback, ...feedbacks]);
        } catch (error) {
            setMessage(error.response?.data?.error || "Submission failed!");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-teal-100 py-10 px-4">
            <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">


                <h2 className="text-xl font-semibold text-gray-700 mb-3">Recent Feedback</h2>
                <div className="space-y-4 max-h-60 overflow-y-auto">
                    {feedbacks.length === 0 ? (
                        <p className="text-gray-500">No feedback yet.</p>
                    ) : (
                        feedbacks.map((fb) => (
                            <div
                              key={fb._id}
                              className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm"
                            >
                              <div className="flex justify-between items-center mb-2">
                                <h3 className="text-lg font-semibold text-blue-600">User Feedback</h3>
                                <span className="text-yellow-500 font-medium">
                                  ⭐ {fb.rating}/5
                                </span>
                              </div>
                              <p className="text-gray-800">{fb.feedback}</p>
                              <p className="text-sm text-gray-400 mt-2">
                                {new Date(fb.timestamp).toLocaleString()}
                              </p>
                            </div>
                          ))
                          
                    )}
                </div>

            </div>
        </div>
    );
};

export default Feedback;
