const express = require("express");
const History = require("../models/History");

const router = express.Router();

// Fetch all patient history
router.get("/history", async (req, res) => {
  try {
    const history = await History.find().sort({ date: -1 });
    res.status(200).json(history);
  } catch (error) {
    console.error("Error fetching history:", error);
    res.status(500).json({ error: "Failed to fetch history" });
  }
});

// Save patient history
router.post("/history", async (req, res) => {
  try {
    // Extract data from request body
    const { 
      age, 
      gender, 
      primary_diagnosis, 
      discharge_to, 
      num_procedures, // Note: will be mapped to procedures
      days_in_hospital, 
      comorbidity_score, // Note: will be mapped to comorbidity
      readmission,
      probability
    } = req.body;

    // Map diagnosis and discharge indices to their text values if needed
    const primaryDiagnoses = ["COPD", "Diabetes", "Heart disease", "Hypertension", "Kidney disease"];
    const dischargeOptions = ["Home", "Home health care", "Rehabilitation facility", "Skilled nursing facility"];
    
    const diagnosisText = isNaN(primary_diagnosis) ? primary_diagnosis : primaryDiagnoses[parseInt(primary_diagnosis)];
    const dischargeText = isNaN(discharge_to) ? discharge_to : dischargeOptions[parseInt(discharge_to)];

    // Create new history entry
    const newHistory = new History({
      date: new Date().toISOString().split('T')[0],
      age,
      gender,
      primary_diagnosis: diagnosisText,
      discharge_to: dischargeText,
      procedures: num_procedures, // Map to procedures field
      days_in_hospital,
      comorbidity: comorbidity_score, // Map to comorbidity field
      readmission,
      probability
    });

    await newHistory.save();
    res.status(201).json({ 
      message: "History saved successfully", 
      history: newHistory 
    });
  } catch (error) {
    console.error("Error saving history:", error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        error: "Validation error", 
        details: error.message 
      });
    }
    
    res.status(500).json({ error: "Failed to save history" });
  }
});

// Delete patient history entry
router.delete("/history/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedHistory = await History.findByIdAndDelete(id);

    if (!deletedHistory) {
      return res.status(404).json({ error: "History entry not found" });
    }

    res.status(200).json({ message: "History entry deleted successfully" });
  } catch (error) {
    console.error("Error deleting history:", error);
    res.status(500).json({ error: "Failed to delete history entry" });
  }
});

module.exports = router;