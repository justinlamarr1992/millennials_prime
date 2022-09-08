const express = require("express");

const {
  createVideo,
  createThumbnail,
  uploadVideo,
  getVideos,
  getSingleVideo,
} = require("../controllers/videoController");

// const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// router.use(requireAuth);

// POST a video
router.post("/uploadfiles", createVideo);
router.post("/thumbnail", createThumbnail);
router.post("/uploadVideo", uploadVideo);
router.get("/getVideos", getVideos);
router.post("/getSingleVideo", getSingleVideo);

module.exports = router;
