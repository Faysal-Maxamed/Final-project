const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");


// Connect to MongoDB
const connectDB = require("./config/db");

// Import routes for various functionalities
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const patientRoutes = require("./routes/patientRoutes");
const feedbackRoutes = require("./routes/Feedbackroutes");
const contactRouter = require("./routes/contactRouter");
const adviceRoutes = require("./routes/adviceRoutes"); // Add advice routes

// Initialize dotenv for environment variable management
dotenv.config();

// Create an instance of the express app
const app = express();

// Middleware
app.use(express.json()); // To parse incoming JSON requests
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)

// Define routes
app.use("/api/auth", authRoutes); // Routes for authentication (login, register, etc.)
app.use("/api/admin", adminRoutes); // Routes for admin-related actions
app.use("/api/patient", patientRoutes); // Routes for patient-related actions
app.use("/api/contact", contactRouter); // Routes for contact form handling
app.use("/api/advice", adviceRoutes); // Routes for advice CRUD operations
app.use("/api/feedback", feedbackRoutes); // Routes for feedback CRUD operations

app.listen(5000, () => {
    console.log("Server running on port 5000")
    connectDB();
})

