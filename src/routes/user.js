const express = require("express");
const router = express.Router();
const {
  handleUserSignUp,
  handleUserLogin,
  handleMe,
  handleLogout,
} = require("../controllers/user");

router.post("/", handleUserSignUp);
router.post("/login", handleUserLogin);
router.get("/me", handleMe);
router.post("/logout", handleLogout);
module.exports = router;
