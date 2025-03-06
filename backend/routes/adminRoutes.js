const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Admin Dashboard (Protected)
router.get("/dashboard", authMiddleware, (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Access denied" });
  }
  res.json({ message: "Welcome to the admin dashboard" });
});

module.exports = router;
