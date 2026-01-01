import { Router } from "express";
import auth from "../middlewares/auth.middleware.js";
import { getOffers } from "../controllers/offer.controller.js";

const router = Router();

router.get("/", auth, getOffers);

export default router;
