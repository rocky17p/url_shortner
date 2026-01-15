import express from "express";
const router = express.Router();
import {
  handlegenerateNewShortURL,
  handlegetanalytics,
  handleListUrls,
} from "../controllers/url.js";

router.post("/", handlegenerateNewShortURL);
router.get("/", handleListUrls);
router.get("/analytics/:shortID", handlegetanalytics);

export default router;
