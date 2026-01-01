const mongoose = require("mongoose");

const referralSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  invitedUsers: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      rewarded: { type: Boolean, default: false }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Referral", referralSchema);
