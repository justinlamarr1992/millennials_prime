const express = require("express");
const router = express.Router();
const testUploadsController = require("../../controllers/testUploadsContoller");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");
const mongoose = require("mongoose");

// Dependencies
const upload = require("../../middleware/gridFS");

const { engine, updateMetadata } = upload;

//Upload Single File THIS WORKS BUT NO META DATA ALSO has the uploadcontroller cod to keep file simple
router.post(
  "/",
  (req, res, next) => {
    updateMetadata(); //Static test value
    next();
  },
  engine.single("file"),
  testUploadsController.uploadVideoInfo
);

// This Does not work but i prefer this format
// router.route("/").post(testUploadsController.uploadVideoInfo);

router.route("/").get(testUploadsController.getVideo);
router.route("/videos").get(testUploadsController.getVideos);

module.exports = router;
