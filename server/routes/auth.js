const express = require("express");

const { login } = require("../controllers/authController");

const router = express.Router();

router.post("/logi", login);

module.exports = router;
