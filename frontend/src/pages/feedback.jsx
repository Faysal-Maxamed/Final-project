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
        <div className="max-h-screen bg-gradient-to-br from-blue-100 to-teal-100 py-10 px-4">

            <h2 className="text-xl font-semibold text-gray-700 mb-3">Recent Feedback</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
                {feedbacks.length === 0 ? (
                    <p className="text-gray-500">No feedback yet.</p>
                ) : (
                    feedbacks.map((fb) => (
                        <div
                            key={fb._id}
                            className="flex items-start gap-3 bg-white shadow-sm border border-gray-200 rounded-lg p-4"
                        >
                            <div className="flex-shrink-0 w-10 h-10 bg-teal-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                                {fb.feedback.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <p className="text-gray-800 mb-1">{fb.feedback}</p>
                                <p className="text-sm text-gray-500">
                                    ⭐ {fb.rating} stars &middot; {new Date(fb.timestamp).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>


        </div>
    );
};

export default Feedback;
