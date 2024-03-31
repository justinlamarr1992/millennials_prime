const express = require("express");
const router = express.Router();
const testController = require("../controllers/testController");

router.get("/web", testController.handleTestWeb);
router.get("/app", testController.handleTestApp);

module.exports = router;
