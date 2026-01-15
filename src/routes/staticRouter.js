// Static router is no longer needed after moving to React SPA
const express = require("express");
const router = express.Router();
router.get("*", (req, res) => {
  return res.status(404).json({ error: "Not found" });
});
module.exports = router;
