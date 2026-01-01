import express from "express";
import cors from "cors";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import walletRoutes from "./routes/wallet.routes.js";
import activityRoutes from "./routes/activity.routes.js";
import offerRoutes from "./routes/offer.routes.js";
import surveyRoutes from "./routes/survey.routes.js";
import referralRoutes from "./routes/referral.routes.js";
import withdrawalRoutes from "./routes/withdrawal.routes.js";
import callbackRoutes from "./routes/callback.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import leaderboardRoutes from "./routes/leaderboard.routes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/offers", offerRoutes);
app.use("/api/surveys", surveyRoutes);
app.use("/api/referrals", referralRoutes);
app.use("/api/withdrawals", withdrawalRoutes);
app.use("/api/callback", callbackRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/leaderboard", leaderboardRoutes);

export default app;
