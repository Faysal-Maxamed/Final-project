const mongoose = require('mongoose');

// Define schema for advice
const adviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    writtenBy: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

// Create and export Advice model
const Advice = mongoose.model('Advice', adviceSchema);
module.exports = Advice;
