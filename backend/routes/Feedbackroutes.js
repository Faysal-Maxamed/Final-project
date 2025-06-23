
const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");

// POST route to handle feedback submission
router.post("/", async (req, res) => {
  try {
    const { feedback, rating, timestamp } = req.body;

    // Validate input
    if (!feedback || typeof feedback !== "string") {
      return res.status(400).json({ error: "Feedback must be a valid string!" });
    }
    const allowedRatings = ["😡", "😞", "😐", "😊", "😀"];
    if (!rating || typeof rating !== "string" || !allowedRatings.includes(rating)) {
      return res.status(400).json({ error: "Rating must be one of the allowed emoji values!" });
    }
    
    const newFeedback = new Feedback({
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
