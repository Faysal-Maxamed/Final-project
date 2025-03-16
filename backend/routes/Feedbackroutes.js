// feedback.js (routes)
const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

// POST route to handle feedback submission
router.post('/', async (req, res) => {
  try {
    const { feedback, rating, timestamp } = req.body;

    const newFeedback = new Feedback({
      feedback,
      rating,
      timestamp,
    });

    await newFeedback.save();

    res.status(200).json({ message: "Feedback saved successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

module.exports = router;
