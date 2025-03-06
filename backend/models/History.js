const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
  age: Number,
  gender: Number,
  primary_diagnosis: Number,
  discharge_to: Number,
  num_procedures: Number,
  days_in_hospital: Number,
  comorbidity_score: Number,
  readmission: String,
  probability: String,
  date: { type: String, default: new Date().toLocaleString() },
});

module.exports = mongoose.model("History", historySchema);
