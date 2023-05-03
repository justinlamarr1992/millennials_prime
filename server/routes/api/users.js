const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
  // MAy need to change to the updated route
  .route("/")
  // .get(userController.getAllUsers)
  .get(verifyRoles(ROLES_LIST.Admin), userController.getAllUsers)
  .delete(verifyRoles(ROLES_LIST.Admin), userController.deleteUser);

router
  .route("/user")
  .post(verifyRoles(ROLES_LIST.User), userController.getUserReq);

router
  .route("/userinfo")
  .post(verifyRoles(ROLES_LIST.User), userController.getUserInfo);

router
  .route("/pic")
  .post(verifyRoles(ROLES_LIST.User), userController.createProfilePicture);

router
  .route("/getpic")
  .post(verifyRoles(ROLES_LIST.User), userController.getPicture);

router
  .route("/art/:id")
  .patch(verifyRoles(ROLES_LIST.User), userController.updateArtInfo);

router
  .route("/business/:id")
  .patch(verifyRoles(ROLES_LIST.User), userController.updateBusinessInfo);

router
  .route("/modal")
  // .route("/modal/:id")
  .post(verifyRoles(ROLES_LIST.User), userController.getModalInfo);

router
  .route("/:id")
  .get(verifyRoles(ROLES_LIST.User), userController.getUser)
  .patch(verifyRoles(ROLES_LIST.User), userController.updateUserInfo);

module.exports = router;
