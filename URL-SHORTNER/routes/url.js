const express = require("express");
const router = express.Router();
const {
  handlegenerateNewShortURL,
  handlegetanalytics,
} = require("../controller/url");
router.post("/", handlegenerateNewShortURL);
router.get("/analytics/:shortID", handlegetanalytics);
module.exports = router;
