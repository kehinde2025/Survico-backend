import mongoose from "mongoose";

export default mongoose.model("User", new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: "user" },
  referralCode: String,
  referredBy: String
}, { timestamps: true }));
