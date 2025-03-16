
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mohaamiin15@gmail.com",
    pass: "qyom hnyv tasd lwcd",
  },
});

app.post("/api/contact", async (req, res) => {
  const { name, email, phone, message } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "mohaamiin15@gmail.com",
    subject: "New Contact Form Submission",
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
  };

  try {
    await transport.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to send email." });
  }
});

// Start Server
app.listen(5000, () => console.log("Server running on port 5000"));