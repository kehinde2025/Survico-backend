import { Router } from "express";
import auth from "../middlewares/auth.middleware.js";
import { referrals } from "../controllers/referral.controller.js";

const router = Router();

router.get("/", auth, referrals);

export default router;
