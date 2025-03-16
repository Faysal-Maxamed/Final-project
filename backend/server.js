const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const patientRoutes = require("./routes/patientRoutes");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/patient", patientRoutes);

// Nodemailer Transporter Configuration
const transport =nodemailer.createTransport({
  service: 'gmail',
  auth: {
     user : "mohaamiin15@gmail.com",
     pass: "qyom hnyv tasd lwcd"
  }
})

const mailOptions ={
  from : "mohaamiin15@gmail.com",
  to : "moeabtidoon02@gmail.com",
  subject: "from contact messages",
  text: "we got your message "
}

transport.sendMail(mailOptions,(error,info)=>{
  if(error){
     console.log(error)
  }else{
     console.log("Email sent :" + info.response)
}
})
// Connect to MongoDB and Start the Server
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(5000, () => console.log("Server running on port 5000")))
  .catch((err) => console.error(err));