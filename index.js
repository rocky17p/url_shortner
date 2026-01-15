import express from "express";
import dotenv from "dotenv";
dotenv.config();
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectMongodb } from "./src/config/database.js";
import { checkforauthentication, restrictTo } from "./src/middlewares/auth.js";
import { handleall } from "./src/controllers/url.js";
import urlRoute from "./src/routes/url.js";
import userRoute from "./src/routes/user.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 8001;
const app = express();

connectMongodb(process.env.MONGO_URL || "mongodb://127.0.0.1:27017/short-url");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Serve React frontend - static files first
const clientDistPath = path.resolve(__dirname, "frontend", "dist");
app.use(express.static(clientDistPath));

app.get("/debug-deployment", (req, res) => {
  const fs = require("fs");
  try {
    const rootFiles = fs.readdirSync(__dirname);
    const distFiles = fs.existsSync(clientDistPath) ? fs.readdirSync(clientDistPath) : "MISSING";
    res.json({
      __dirname,
      clientDistPath,
      rootFiles,
      distFiles,
      env: process.env.NODE_ENV
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(port, () => console.log(`server started at port ${port}`));
