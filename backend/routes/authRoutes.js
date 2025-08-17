// backend/routes/authRoutes.js

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

// Register Patient
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role: "patient" });
    await user.save();
    res.status(201).json({ message: "Patient registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Register Admin (only from frontend for now)
router.post("/register-admin", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role: "admin" });
    await user.save();
    res.status(201).json({ message: "Admin registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role, name: user.name, email: user.email },
      process.env.JWT_SECRET || "your_jwt_secret_key",
      { expiresIn: "1h" }
    );

    // Send _id along with token and role
    res.json({ token, role: user.role, _id: user._id }); // Include _id here
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Get current user info
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// Get all users (used by dashboard/admin & patient lists)
router.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Check if email exists
router.post("/check-email", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    res.json({ exists: !!user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Reset password without token
router.post("/reset-password-direct", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ error: "User not found" });

    user.password = await bcrypt.hash(password, 10);
    await user.save();

    res.json({ message: "Password has been reset successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// Update user profile (patients and admins use the same endpoint)
router.put("/update-profile/:_id", auth, async (req, res) => {
  try {
    const { name, fullName, email, password, role } = req.body;
    const userId = req.params._id;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Only allow self-update or admin to update others
    const isSelf = req.user?.userId?.toString() === userId.toString();
    const isAdmin = req.user?.role === "admin";
    if (!isSelf && !isAdmin) {
      return res.status(403).json({ error: "Not authorized to update this user" });
    }

    // Check if the password is being updated
    const updatedFields = {};

    if (typeof email === "string" && email.trim() !== "") {
      updatedFields.email = email.trim();
    }
    const resolvedName = (typeof fullName === "string" && fullName.trim() !== "")
      ? fullName.trim()
      : (typeof name === "string" && name.trim() !== "" ? name.trim() : undefined);
    if (resolvedName) {
      updatedFields.name = resolvedName;
    }
    // Only admins can change roles
    if (typeof role === "string" && role.trim() !== "" && isAdmin) {
      updatedFields.role = role.trim();
    }

    if (password) {
      // Encrypt the password before saving it
      const salt = await bcrypt.genSalt(10);
      updatedFields.password = await bcrypt.hash(password, salt);
    }

    // Update the user
    const updatedUser = await User.findByIdAndUpdate(userId, updatedFields, {
      new: true, // Return the updated user object
    });

    // Return sanitized user
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      createdAt: updatedUser.createdAt,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
// Delete user (no role validation per requirements)
const deleteUserHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const userToDelete = await User.findById(id);
    if (!userToDelete) {
      return res.status(404).json({ error: "User not found" });
    }

    await User.findByIdAndDelete(id);
    return res.json({ message: "User deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Support both route styles
router.delete("/deleteUser/:id", deleteUserHandler);
router.delete("/delete-user/:id", deleteUserHandler);

module.exports = router;
