import mongoose from "mongoose";

export default mongoose.model("Wallet", new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  balance: { type: Number, default: 0 },
  points: { type: Number, default: 0 },
  tasksCompleted: { type: Number, default: 0 }
}));
