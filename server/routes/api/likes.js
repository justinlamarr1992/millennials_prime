const express = require("express");
const router = express.Router();
const likeController = require("../../controllers/likeController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

// MAYNOT WORK I CHNGED orignal .post "/" to .get "/"
// router.route("/").get(verifyRoles(ROLES_LIST.User), likeController.testLikes);
router
  .route("/like")
  .post(verifyRoles(ROLES_LIST.User), likeController.postLike);
router
  .route("/likes")
  .post(verifyRoles(ROLES_LIST.User), likeController.getLikes);
router
  .route("/dislike")
  .post(verifyRoles(ROLES_LIST.User), likeController.postDislike);
router
  .route("/dislikes")
  .post(verifyRoles(ROLES_LIST.User), likeController.getDislikes);

router
  .route("/unlike")
  .post(verifyRoles(ROLES_LIST.User), likeController.postUnlike);
router
  .route("/undislike")
  .post(verifyRoles(ROLES_LIST.User), likeController.postUndislike);

module.exports = router;
