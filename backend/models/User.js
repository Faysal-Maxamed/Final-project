const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["admin", "patient"], required: true, default: "patient" },
});

module.exports = mongoose.model("User", UserSchema);
