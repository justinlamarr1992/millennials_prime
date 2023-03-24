const express = require("express");
const router = express.Router();
const testUploadsController = require("../../controllers/testUploadsContoller");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");
const mongoose = require("mongoose");

// Dependencies
const upload = require("../../middleware/gridFS");

const { engine, updateMetadata } = upload;

// Test 3
// router.post(
//   "/",
//   (req, res, next) => {
//     updateMetadata(req.body); //Static test value
//     next();
//   },
//   engine.single("file"),
//   testUploadsController.trailVideo
// );

//Upload Single File THIS WORKS BUT NO META DATA ALSO has the uploadcontroller cod to keep file simple
router.post(
  "/",
  (req, res, next) => {
    updateMetadata(req.body); //Static test value
    next();
  },
  engine.single("file"),
  testUploadsController.uploadVideoInfo
);

// This Does not work but i prefer this format
// router.route("/").post(testUploadsController.uploadVideoInfo);

router.route("/update").post(testUploadsController.updatesMetadata);

module.exports = router;
