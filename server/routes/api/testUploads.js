const express = require("express");
const router = express.Router();
const testUploadsController = require("../../controllers/testUploadsContoller");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");
const mongoose = require("mongoose");

// Dependencies
const upload = require("../../middleware/gridFS");

const { engine, updateMetadata } = upload;

router.route("/").post(
  (req, res, next) => {
    console.log(req.body);
    updateMetadata(req.body);
    next();
  },
  engine.single("file"),
  testUploadsController.uploadVideo
);

router.route("/").post(testUploadsController.uploadVideo);

module.exports = router;
