const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const History = require("../models/History");

const router = express.Router();

// Patient Profile (Protected)
router.get("/profile", authMiddleware, (req, res) => {
  if (req.user.role !== "patient") {
    return res.status(403).json({ error: "Access denied" });
  }
  res.json({ message: "Welcome to your patient profile" });
});

// Save Patient History
router.post("/history", async (req, res) => {
  try {
    const newHistory = new History(req.body);
    await newHistory.save();
    res.status(201).json({ message: "History Saved Successfully", history: newHistory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to Save History" });
  }
});

// Delete Patient History Entry
router.delete("/history/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedHistory = await History.findByIdAndDelete(id);

    if (!deletedHistory) {
      return res.status(404).json({ error: "History entry not found" });
    }

    res.status(200).json({ message: "History entry deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Fetch Patient History
router.get("/history", async (req, res) => {
  try {
    const history = await History.find();
    res.status(200).json(history);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to Fetch History" });
  }
});

module.exports = router;
