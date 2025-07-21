
const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  feedback: {
    type: String,
    required: [true, "Feedback is required"],
    trim: true, // Removes extra spaces
  },
  rating: {
    type: String, // Ensure it's a number
    required: [true, "Rating is required"],
    min: 1, // Minimum rating value
    max: 5, // Maximum rating value
  },
  timestamp: {
    type: Date,
    default: Date.now, // Auto set if missing
  },
});

// Export the model
module.exports = mongoose.model("Feedback", feedbackSchema);
