import CompletedTask from "../models/CompletedTask.js";
import Activity from "../models/Activity.js";
import { creditWallet } from "../services/wallet.service.js";

export const reward = async (req, res) => {
  const { user, amount, taskId, provider } = req.body;

  const exists = await CompletedTask.findOne({ user, taskId, provider });
  if (exists) return res.send("DUPLICATE");

  await CompletedTask.create({ user, taskId, provider });
  await creditWallet(user, amount, amount * 10);

  await Activity.create({
    user,
    type: "reward",
    amount
  });

  res.send("OK");
};
