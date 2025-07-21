
const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");

// POST route to handle feedback submission
router.post("/", async (req, res) => {
  try {
    const { name, email, feedback, rating, timestamp } = req.body;

    // Validate input
    if (!name || typeof name !== "string") {
      return res.status(400).json({ error: "Name is required and must be a string!" });
    }
    if (!email || typeof email !== "string") {
      return res.status(400).json({ error: "Email is required and must be a string!" });
    }
    if (!feedback || typeof feedback !== "string") {
      return res.status(400).json({ error: "Feedback must be a valid string!" });
    }
    const allowedRatings = ["😡", "😞", "😐", "😊", "😀"];
    if (!rating || typeof rating !== "string" || !allowedRatings.includes(rating)) {
      return res.status(400).json({ error: "Rating must be one of the allowed emoji values!" });
    }
    
    const newFeedback = new Feedback({
      name,
      email,
      feedback,
      rating, // Save as string (emoji)
      timestamp: timestamp || new Date(),
    });

    await newFeedback.save();
    res.status(201).json({ message: "Feedback saved successfully!", feedback: newFeedback });
  } catch (error) {
    console.error("Error saving feedback:", error);
    res.status(500).json({ error: "Something went wrong while saving feedback!" });
  }
});

// DELETE route to delete feedback by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Feedback.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: "Feedback not found!" });
    }
    res.status(200).json({ message: "Feedback deleted successfully!" });
  } catch (error) {
    console.error("Error deleting feedback:", error);
    res.status(500).json({ error: "Failed to delete feedback!" });
  }
});

// GET route to fetch all feedback
router.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ timestamp: -1 }); // Get latest first
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ error: "Failed to fetch feedback!" });
  }
});

module.exports = router;
