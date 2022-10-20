const express = require("express");
const router = express.Router();
const subscribeController = require("../../controllers/subscribeController.js");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

// POST a video
router;
//   .route("/")
//   .get(videoController.getVideos)
//   .post(videoController.uploadVideo);

// router.route("/createVideoFiles").post(videoController.createVideo);
// router.route("/createThumbnail").post(videoController.createThumbnail);
// router.route("/:id").post(videoController.getSingleVideo); //original tut had this as a post... revisit

// router.post("/uploadFiles", videoController.createVideo);
// router.post("/:id", videoController.getSingleVideo);
// router.post("/thumbnail", videoController.createThumbnail);

module.exports = router;
