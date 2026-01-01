import Wallet from "../models/wallet.js";

export const leaderboard = async (_, res) => {
  const top = await Wallet.find()
    .sort({ balance: -1 })
    .limit(20)
    .populate("user", "email");

  res.json(top);
};
