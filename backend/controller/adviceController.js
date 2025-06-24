const Advice = require('../models/advice.js');

// Get advice by diagnosis
exports.getAdviceByDiagnosis = async (req, res) => {
  try {
    const { diagnosis } = req.params;
    const advice = await Advice.findOne({ diagnosis });
    if (!advice) return res.status(404).json({ error: 'Advice not found' });
    res.json(advice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add or update advice
exports.addOrUpdateAdvice = async (req, res) => {
  try {
    const { diagnosis, positive, negative } = req.body;
    let advice = await Advice.findOneAndUpdate(
      { diagnosis },
      { positive, negative },
      { new: true, upsert: true }
    );
    res.json(advice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all advice
exports.getAllAdvice = async (req, res) => {
  try {
    const adviceList = await Advice.find();
    res.json(adviceList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create advice (no upsert)
exports.createAdvice = async (req, res) => {
  try {
    const { diagnosis, positive, negative } = req.body;
    if (!diagnosis || !positive || !negative) {
      return res.status(400).json({ error: 'diagnosis, positive, and negative are required.' });
    }
    // Check for duplicate diagnosis
    const exists = await Advice.findOne({ diagnosis });
    if (exists) {
      return res.status(409).json({ error: 'Advice for this diagnosis already exists.' });
    }
    const advice = new Advice({ diagnosis, positive, negative });
    await advice.save();
    res.status(201).json(advice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete advice by _id
exports.deleteAdvice = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Advice.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Advice not found' });
    }
    res.json({ message: 'Advice deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update advice (only update, no upsert)
exports.updateAdvice = async (req, res) => {
  try {
    const { diagnosis, positive, negative } = req.body;
    // Only update if advice exists
    const advice = await Advice.findOneAndUpdate(
      { diagnosis },
      { positive, negative },
      { new: true }
    );
    if (!advice) {
      return res.status(404).json({ error: 'Advice not found for this diagnosis.' });
    }
    res.json(advice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

