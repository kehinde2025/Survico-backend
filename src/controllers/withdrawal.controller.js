import Withdrawal from "../models/Withdrawal.js";
import Wallet from "../models/wallet.js";

export const requestWithdrawal = async (req, res) => {
  const { amount } = req.body;
  const wallet = await Wallet.findOne({ user: req.user.id });

  if (amount < 1000) return res.status(400).send("Minimum ₦1000");
  if (wallet.balance < amount) return res.sendStatus(400);

  wallet.balance -= amount;
  await wallet.save();

  const withdrawal = await Withdrawal.create({
    user: req.user.id,
    amount
  });

  res.json(withdrawal);
};
