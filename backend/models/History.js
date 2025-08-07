const mongoose = require("mongoose");

const HistorySchema = new mongoose.Schema({
  date: {
    type: String,
    default: () => new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
    required: true
  },
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  age: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female"]
  },
  primary_diagnosis: {
    type: String,
    required: true
  },
  discharge_to: {
    type: String,
    required: true
  },
  procedures: {
    type: String,
    required: true
  },
  days_in_hospital: {
    type: String,
    required: true
  },
  comorbidity: {
    type: String,
    required: true
  },
  readmission: {
    type: String,
    required: true,
    enum: ["Yes", "No"]
  },
  probability: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("History", HistorySchema);