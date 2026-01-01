import mongoose from "mongoose";

export default mongoose.model("Activity", new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  type: String,
  amount: Number
}, { timestamps: true }));
