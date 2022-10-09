const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/", authController.handleLogin);

// router.post("/login", login);
// router.post("/register", register);
// router.get("/logout", logout);
// router.get("/refresh", refreshToken);

module.exports = router;
