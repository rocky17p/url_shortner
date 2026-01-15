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

// Connect to DB using MONGO_URI (preferred) or MONGO_URL (fallback)
const mongoUri = process.env.MONGO_URI || process.env.MONGO_URL || "mongodb://127.0.0.1:27017/short-url";
connectMongodb(mongoUri);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Serve React frontend - static files first
// Serve React frontend - static files first
const clientDistPath = path.resolve(__dirname, "frontend", "dist");
app.use(express.static(clientDistPath));

// API routes
app.use("/url", restrictTo(["NORMAL"]), urlRoute);
app.use("/user", userRoute);

// Redirect handler for shortened URLs
// This matches generic paths, so if it doesn't find a URL, it calls next()
app.get("/:shortID", handleall);

// Catch-all route for SPA (must be last)
// If previous routes didn't match (API or ShortID), serve the frontend
// Catch-all route for SPA (must be last)
// If previous routes didn't match (API or ShortID), serve the frontend
// Using a middleware function to avoid regex or wildcard issues in Express 5
app.use((req, res, next) => {
  if (req.method === "GET") {
    return res.sendFile(path.join(clientDistPath, "index.html"));
  }
  next();
});

app.listen(port, () => console.log(`server started at port ${port}`));
