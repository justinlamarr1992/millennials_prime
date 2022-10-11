const express = require("express");
const router = express.Router();
const videoController = require("../../controllers/videoController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

// POST a video
router.get("/", videoController.getVideos);
router.get("/:id", videoController.getSingleVideo);
router.post("/uploadFiles", videoController.createVideo);
router.post("/thumbnail", videoController.createThumbnail);
router.post("/", videoController.uploadVideo);

module.exports = router;
