const express = require("express");
const router = express.Router();
const likeController = require("../../controllers/likeController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

// MAYNOT WORK I CHNGED orignal .post "/" to .get "/"
router
  .route("/getLikes")
  .post(verifyRoles(ROLES_LIST.User), likeController.getLikes);
// router
//   .route("/getLikes")
//   .post(verifyRoles(ROLES_LIST.User), likeController.postLikes);
// router
//   .route("/getLikes")
//   .post(verifyRoles(ROLES_LIST.User), likeController.postLikes);
// router
//   .route("/getLikes")
//   .post(verifyRoles(ROLES_LIST.User), likeController.postLikes);
// router
//   .route("/getLikes")
//   .post(verifyRoles(ROLES_LIST.User), likeController.postLikes);
// router
//   .route("/getLikes")
//   .post(verifyRoles(ROLES_LIST.User), likeController.postLikes);

// router
//   .route("/getComments")
//   .post(verifyRoles(ROLES_LIST.User), commentController.getComments);

// router
//   .route("/subscribe")
//   .post(verifyRoles(ROLES_LIST.User), subscribeController.postSubscribe);

// router
//   .route("/unsubscribe")
//   .post(verifyRoles(ROLES_LIST.User), subscribeController.postUnsubscribe);

// router
//   .route("/subscribed")
//   .post(verifyRoles(ROLES_LIST.User), subscribeController.getSubscribed);

module.exports = router;
