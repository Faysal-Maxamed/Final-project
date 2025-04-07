const express = require('express');
const Advice = require('../models/advice'); // Make sure to adjust the path as necessary

const router = express.Router();

// Create new advice
router.post('/create', async (req, res) => {
  try {
    const { title, description, writtenBy } = req.body; // Added writtenBy to the request body
    const newAdvice = new Advice({ title, description, writtenBy }); // Include writtenBy in the creation of the advice
    await newAdvice.save();
    res.status(201).json(newAdvice);
  } catch (error) {
    res.status(400).json({ message: 'Error creating advice', error });
  }
});

// Get all advice entries
router.get('/all', async (req, res) => {
  try {
    const advice = await Advice.find(); // Retrieve all advice entries
    res.status(200).json(advice);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching advice', error });
  }
});

// Update advice
router.put('/advice/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, writtenBy } = req.body; // Added writtenBy for updating

    const updatedAdvice = await Advice.findByIdAndUpdate(
      id,
      { title, description, writtenBy }, // Updated to include writtenBy in the update
      { new: true }
    );

    if (!updatedAdvice) {
      return res.status(404).json({ message: 'Advice not found' });
    }

    res.status(200).json(updatedAdvice);
  } catch (error) {
    res.status(400).json({ message: 'Error updating advice', error });
  }
});

// Delete advice
router.delete('/advice/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAdvice = await Advice.findByIdAndDelete(id);

    if (!deletedAdvice) {
      return res.status(404).json({ message: 'Advice not found' });
    }

    res.status(200).json({ message: 'Advice deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting advice', error });
  }
});

module.exports = router;
