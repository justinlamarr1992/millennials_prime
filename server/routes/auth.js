const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const syncPasswordController = require("../controllers/syncPasswordController");

router.post("/", authController.handleLogin);
router.post("/sync-password", syncPasswordController.handleSyncPassword);

module.exports = router;
