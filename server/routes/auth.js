const express = require("express");
const router = express.Router();
// const authController = require("../controllers/authController");

const {
  login,
  register,
  logout,
  refreshToken,
} = require("../controllers/authController");

router.post("/login", login);
// router.post("/login", authController.login);
router.post("/register", register);
router.get("/logout", logout);
router.get("/refresh", refreshToken);

module.exports = router;
