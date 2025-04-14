const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const mongoose = require("mongoose");
const router = express.Router();

// Register Patient (Default Role)
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role: "patient" });
    await user.save();
    res.json({ message: "Patient registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Register Admin (Only by Existing Admin)
router.post("/register-admin", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin user
    const user = new User({ name, email, password: hashedPassword, role: "admin" });
    await user.save();

    res.json({ message: "Admin registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Fetch all users (Admins and Patients)
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // Exclude passwords for security
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post("/login", async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const user = await User.findOne({ email, role });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // ✅ Just return token and role directly
    res.json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});





// DELETE USER (Only Admins Can Delete Patients)
router.delete("/deleteUser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { adminId } = req.body; // Get admin's ID from request body

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(adminId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    // Find the admin making the request
    const adminUser = await User.findById(adminId);
    if (!adminUser || adminUser.role !== "admin") {
      return res.status(403).json({ error: "Only admins can delete users" });
    }

    // Find the user to be deleted
    const userToDelete = await User.findById(id);
    if (!userToDelete) {
      return res.status(404).json({ error: "User not found" });
    }

    // Prevent deletion of another admin
    if (userToDelete.role === "admin") {
      return res.status(403).json({ error: "Cannot delete an admin" });
    }

    // Delete the user
    await User.findByIdAndDelete(id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
