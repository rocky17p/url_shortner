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
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
      ];
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        return callback(new Error("The CORS policy for this site does not allow access from the specified Origin."), false);
      }
      return callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(checkforauthentication);

// API routes
app.use("/url", restrictTo(["NORMAL"]), urlRoute);
app.use("/user", userRoute);

// Redirect handler for shortened URLs
app.get("/:shortID", handleall);

// Serve React frontend - this must come LAST
const clientDistPath = path.resolve(__dirname, "frontend", "dist");
app.use(express.static(clientDistPath));

app.listen(port, () => console.log(`server started at port ${port}`));
