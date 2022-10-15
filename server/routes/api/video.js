const express = require("express");
const router = express.Router();
const videoController = require("../../controllers/videoController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

// POST a video
router
  .route("/")
  .get(videoController.getVideos)
  .post(videoController.uploadVideo);

router.route("/:id").post(videoController.getSingleVideo); //original tut had this as a post... revisit
router.route("/uploadFiles").post(videoController.createVideo);
router.route("/thumbnail").post(videoController.createThumbnail);

// router.post("/uploadFiles", videoController.createVideo);
// router.post("/:id", videoController.getSingleVideo);
// router.post("/thumbnail", videoController.createThumbnail);

module.exports = router;
