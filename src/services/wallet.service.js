import Wallet from "../models/wallet.js";

export const creditWallet = async (userId, amount, points = 0) => {
  return Wallet.findOneAndUpdate(
    { user: userId },
    {
      $inc: {
        balance: amount,
        points,
        tasksCompleted: 1
      }
    },
    { new: true }
  );
};
