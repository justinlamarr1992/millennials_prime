const express = require("express");
const router = express.Router();
const subscribeController = require("../../controllers/subscribeController.js");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

// POST a video
// router.post(subscribeController.getSubscribers).route("/");
router.route("/").post(subscribeController.getSubscribers);
//   .get(videoController.getVideos)

module.exports = router;
