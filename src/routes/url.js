const express = require("express");
const router = express.Router();
const {
  handlegenerateNewShortURL,
  handlegetanalytics,
  handleListUrls,
} = require("../controllers/url");
router.post("/", handlegenerateNewShortURL);
router.get("/", handleListUrls);
router.get("/analytics/:shortID", handlegetanalytics);
module.exports = router;
