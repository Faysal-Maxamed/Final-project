const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  feedback: {
    type: String,
    required: [true, "Feedback is required"],
    trim: true, // Removes extra spaces
  },
  rating: {
    type: Number, // Ensure it's a number
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
