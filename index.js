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

/* =======================
   DATABASE
======================= */
const mongoUri = process.env.MONGO_URI || process.env.MONGO_URL;

if (!mongoUri) {
  console.error("❌ MONGO_URI is not defined. MongoDB not connected.");
} else {
  connectMongodb(mongoUri);
}


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
   STATIC FRONTEND (FIRST)
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
======================= */
app.get("/:shortID", (req, res, next) => {
  if (req.params.shortID.includes(".")) return next();
  handleall(req, res, next);
});

/* =======================
   SPA FALLBACK (LAST)
======================= */
app.get("*", (req, res) => {
  res.sendFile(path.join(clientDistPath, "index.html"));
});

/* =======================
   EXPORT FOR VERCEL
======================= */
export default app;
