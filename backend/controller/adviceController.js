// const Advice = require('../models/advice.js');

// // Create new advice
// const createAdvice = async (req, res) => {
//   try {
//     const { title, description } = req.body;
//     const newAdvice = new Advice({ title, description });
//     await newAdvice.save();
//     res.status(201).json(newAdvice); // Send response
//   } catch (error) {
//     res.status(400).json({ message: "Error creating advice", error });
//   }
// };


// // Get all advice entries
// const getAllAdvice = async (req, res) => {
//   try {
//     const advice = await Advice.find();
//     res.status(200).json(advice);
//   } catch (error) {
//     res.status(400).json({ message: "Error fetching advice", error });
//   }
// };

// // Update advice
// const updateAdvice = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, description } = req.body;

//     const updatedAdvice = await Advice.findByIdAndUpdate(id, { title, description }, { new: true });

//     if (!updatedAdvice) {
//       return res.status(404).json({ message: "Advice not found" });
//     }

//     res.status(200).json(updatedAdvice);
//   } catch (error) {
//     res.status(400).json({ message: "Error updating advice", error });
//   }
// };

// // Delete advice
// const deleteAdvice = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deletedAdvice = await Advice.findByIdAndDelete(id);

//     if (!deletedAdvice) {
//       return res.status(404).json({ message: "Advice not found" });
//     }

//     res.status(200).json({ message: "Advice deleted successfully" });
//   } catch (error) {
//     res.status(400).json({ message: "Error deleting advice", error });
//   }
// };

// module.exports = {
//   createAdvice,
//   getAllAdvice,
//   updateAdvice,
//   deleteAdvice
// };
