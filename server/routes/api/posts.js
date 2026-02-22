const express = require("express");
const router = express.Router();
const postController = require("../../controllers/postController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

// /posts/profile must be declared before /posts/:userId to avoid param match
router.get("/profile", verifyRoles(ROLES_LIST.User), postController.getOwnPosts);
router.get("/:userId", verifyRoles(ROLES_LIST.User), postController.getUserPosts);
router.post("/", verifyRoles(ROLES_LIST.User), postController.createPost);
router.patch("/:id", verifyRoles(ROLES_LIST.User), postController.updatePost);
router.delete("/:id", verifyRoles(ROLES_LIST.User), postController.deletePost);

module.exports = router;
