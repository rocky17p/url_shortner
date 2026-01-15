import express from "express";
const router = express.Router();
import {
  handleUserSignUp,
  handleUserLogin,
  handleMe,
  handleLogout,
} from "../controllers/user.js";

router.post("/", handleUserSignUp);
router.post("/login", handleUserLogin);
router.get("/me", handleMe);
router.post("/logout", handleLogout);

export default router;
