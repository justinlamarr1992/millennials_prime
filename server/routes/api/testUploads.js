const express = require("express");
const router = express.Router();
const testUploadsController = require("../../controllers/testUploadsContoller");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");
const mongoose = require("mongoose");
var ffmpeg = require("fluent-ffmpeg");
const multer = require("multer");
const concat = require("stream-concat");
var fs = require("fs");
const { MongoClient, ObjectId, GridFSBucket } = require("mongodb");
var mime = require("mime");

var app = express();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.route("/").post(
  verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
  // (req, res, next) => {
  //   console.log(req.file);
  //   next();
  // },
  // upload.single("file"),
  testUploadsController.uploadVideo
);
// // ORIGINAL
// router.route("/").post(
//   verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
//   // (req, res, next) => {
//   //   console.log(req.file);
//   //   next();
//   // },
//   // upload.single("file"),
//   testUploadsController.uploadVideo
// );

router
  .route("/")
  .get(verifyRoles(ROLES_LIST.User), testUploadsController.getVideo);
router
  .route("/videos")
  .get(verifyRoles(ROLES_LIST.User), testUploadsController.getVideos);
// router
//   .route(`/files`)
//   .get(verifyRoles(ROLES_LIST.User), testUploadsController.getVideos);
// router
//   .route(`/file`)
//   .get(verifyRoles(ROLES_LIST.User), testUploadsController.getVideo);

module.exports = router;
