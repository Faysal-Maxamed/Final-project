const mongoose = require('mongoose');

// Define schema for advice
const adviceSchema = new mongoose.Schema({
  diagnosis: { type: String, required: true, unique: true },
  positive: { type: String, required: true },
  negative: { type: String, required: true }
});

// Create and export Advice model
module.exports = mongoose.model('Advice', adviceSchema);
