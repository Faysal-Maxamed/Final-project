const express = require('express');
const Advice = require('../models/advice'); // Make sure to adjust the path as necessary
const adviceController = require('../controller/adviceController');

const router = express.Router();

// Get advice for a diagnosis
// router.get('/:diagnosis', adviceController.getAdviceByDiagnosis);

// Update advice (only update, no upsert)
router.patch('/', adviceController.updateAdvice);

// Get all advice (admin)
router.get('/all', adviceController.getAllAdvice);

// Create advice (admin, only create, no upsert)
router.post('/create', adviceController.createAdvice);

// Delete advice by _id
router.delete('/:id', adviceController.deleteAdvice);

module.exports = router;
