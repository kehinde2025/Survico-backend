const Withdrawal = require("../models/Withdrawal");
const User = require("../models/User");
const Offer = require("../models/Offer");
import{sendPayout} from "../services/paymentGateway.js";

// Get all pending withdrawals
exports.getPendingWithdrawals = async (req, res) => {
  try {
    const withdrawals = await Withdrawal.find({ status: "pending" })
      .populate("userId", "name email")
      .sort({ createdAt: -1 });
    res.json(withdrawals);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching withdrawals" });
  }
};

// Approve withdrawal
exports.approveWithdrawal = async (req, res) => {
  const w = await Withdrawal.findById(req.params.id);
  if (!w || w.status !== "pending") return res.sendStatus(404);

  await sendPayout({
    amount: w.amount,
    account_number: "0000000000",
    bank_code: "058"
  });

  w.status = "paid";
  await w.save();

  res.json(w);
};

// Reject withdrawal
exports.rejectWithdrawal = async (req, res) => {
  try {
    const { id } = req.params;
    const withdrawal = await Withdrawal.findById(id);
    if (!withdrawal) return res.status(404).json({ message: "Withdrawal not found" });

    withdrawal.status = "rejected";
    await withdrawal.save();

    // Refund user balance
    const user = await User.findById(withdrawal.userId);
    user.balance += withdrawal.amount;
    await user.save();

    res.json({ message: "Withdrawal rejected and refunded", withdrawal });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error rejecting withdrawal" });
  }
};

// Get all offers (admin)
exports.getAllOffers = async (req, res) => {
  try {
    const offers = await Offer.find().sort({ createdAt: -1 });
    res.json(offers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching offers" });
  }
};
