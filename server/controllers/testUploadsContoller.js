const express = require("express");
var app = express();
var ffmpeg = require("fluent-ffmpeg");
const multer = require("multer");
const concat = require("stream-concat");
var fs = require("fs");
const { MongoClient, ObjectId, GridFSBucket } = require("mongodb");
var mime = require("mime");
const logger = require("../utils/logger");
const Video = require("../models/VideoModel");
var mongoose = require("mongoose");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

client.connect((err) => {
  const db = client.db("test");
  const bucket = new GridFSBucket(db, { bucketName: "videos" });
});

const connect = mongoose.createConnection(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// TODO: When done testing this needs to be un remarked
// THIS IS THE BUCKET!!!
let gfs;
connect.once("open", () => {
  gfs = new mongoose.mongo.GridFSBucket(connect.db, {
    bucketName: "videos",
  });
});

const uploadVideo = async (req, res) => {};

const uploadVideoInfo = async (req, res, next) => {
  gfs
    .find({})
    .sort({ _id: -1 })
    .limit(1)
    .toArray((err, files) => {
      if (!files || files.length === 0) {
        return res.status(200).json({
          success: false,
          message: "No files available",
        });
      }
      files.map((file) => {
        const changeId = file._id;
      });

      res.status(200).json({
        success: true,
        files,
      });
    });
  const testFind = gfs.find({ _id: new ObjectId("6423661daf0c4779b4709c9c") });
};

const downloadVideo = async (req, res) => {};
const deleteVideo = async (req, res) => {
  const fileId = new ObjectId("63d40176741612651ed5f84c");

  await gfs.delete({ _id: fileId });
};
const getVideo = async (req, res) => {
  // This gets the latest Video Submit
  // Todo: Maker it to where its from MillPrime and associates Profile only
  try {
    const chunks = gfs.find({
      files_id: new Object("6425fcf1e6f823ecea5c5587"),
    });
  } catch (err) {
    logger.error(err);
    res.status(400).json({ success: false, err });
  }
};
const getVideos = async (req, res) => {
  try {
    const testFind = gfs.find({}).toArray((err, files) => {
      if (!files[0] || files.length === 0) {
        return res.status(200).json({
          success: false,
          message: "No files available",
        });
      }
      res.status(200).json({
        success: true,
        files,
      });
    });
  } catch (err) {
    logger.error(err);
    res.status(400).json({ success: false, err });
  }
};

module.exports = {
  uploadVideo,
  uploadVideoInfo,
  downloadVideo,
  getVideo,
  getVideos,
  deleteVideo,
};
