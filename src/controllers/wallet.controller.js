import Wallet from "../models/wallet";
export const getWallet = async (req, res) =>
  res.json(await Wallet.findOne({ user: req.user.id }));
