import express from "express";
import dotenv from "dotenv";
dotenv.config();

import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectMongodb } from "./src/config/database.js";
import { restrictTo } from "./src/middlewares/auth.js";
import { handleall } from "./src/controllers/url.js";
import urlRoute from "./src/routes/url.js";
import userRoute from "./src/routes/user.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 8001;

/* =======================
   DATABASE
======================= */
const mongoUri =
  process.env.MONGO_URI ||
  process.env.MONGO_URL ||
  "mongodb://127.0.0.1:27017/short-url";

connectMongodb(mongoUri);

/* =======================
   MIDDLEWARE
======================= */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

/* =======================
   STATIC FRONTEND (MUST BE FIRST)
======================= */
const clientDistPath = path.resolve(__dirname, "frontend", "dist");
app.use(express.static(clientDistPath));

/* =======================
   API ROUTES
======================= */
app.use("/user", userRoute);
app.use("/url", restrictTo(["NORMAL"]), urlRoute);

/* =======================
   SHORT URL REDIRECT
   (only if NOT a file)
======================= */
app.get("/:shortID", handleall);

/* =======================
   SPA FALLBACK (LAST)
======================= */
app.get("*", (req, res) => {
  res.sendFile(path.join(clientDistPath, "index.html"));
});

/* =======================
   SERVER
======================= */
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
