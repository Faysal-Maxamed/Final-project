const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const Contact = require("../models/contact");

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mohaamiin15@gmail.com",
    pass: "qrtq thad zabe vfon",
  },
});

// Verify transporter configuration
transport.verify(function(error, success) {
  if (error) {
    console.log("Transporter verification error:", error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ 
        success: false, 
        message: "All fields are required" 
      });
    }

    // Create new contact entry
    const newContact = new Contact({
      name,
      email,
      phone,
      message
    });

    // Save to database
    await newContact.save();

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: "mohaamiin15@gmail.com",
      subject: "New Contact Form Submission",
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong> ${message}</p>
      `
    };

    // Send email
    const info = await transport.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);

    res.status(200).json({ 
      success: true, 
      message: "Message sent successfully!",
      messageId: info.messageId
    });
  } catch (error) {
    console.error("Detailed error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to send message",
      error: error.message 
    });
  }
});

// Admin: list all contacts
router.get("/", async (_req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
});

module.exports = router; 