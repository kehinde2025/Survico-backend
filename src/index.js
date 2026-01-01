import app from "./app.js";
import connectDB from "./config/db.js";

connectDB().then(() => {
  app.listen(process.env.PORT, () =>
    console.log("Server running")
  );
});
