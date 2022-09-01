const express = require("express");

const { createVideo } = require("../controllers/videoController");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

// POST a video
router.post("/uploadfiles", createVideo);

module.exports = router;
