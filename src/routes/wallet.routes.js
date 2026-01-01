import { Router } from "express";
import auth from "../middlewares/auth.middleware.js";
import { getWallet } from "../controllers/wallet.controller.js";

const router = Router();

router.get("/", auth, getWallet);

export default router;
