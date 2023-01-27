const express = require("express");
const router = express.Router();
const testUploadsController = require("../../controllers/testUploadsContoller");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");
const mongoose = require("mongoose");

// Dependencies
const upload = require("../../middleware/gridFS");

const { engine, updateMetadata } = upload;

//Upload Single File
// router.post(
//   "/",
//   (req, res, next) => {
//     // updateMetadata(req.body); //Static test value
//     next();
//   },
//   engine.single("file"),
//   testUploadsController.uploadVideoInfo
// );

router.route("/").post(testUploadsController.uploadVideoInfo);

module.exports = router;
