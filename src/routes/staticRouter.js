import express from "express";
const router = express.Router();

router.get("*", (req, res) => {
  return res.status(404).json({ error: "Not found" });
});

export default router;
