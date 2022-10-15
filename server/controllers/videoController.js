const express = require("express");
const multer = require("multer");
var ffmpeg = require("fluent-ffmpeg");
const User = require("../models/MillPrimeUser");
const Video = require("../models/VideoModel");
var mongoose = require("mongoose");

const getVideos = async (req, res) => {
  const videos = await Video.find().sort({ createdAt: -1 });
  if (!videos) return res.status(204).json({ message: `No Videos ` });
  res.status(200).json({ success: true, videos });
};

const getSingleVideo = async (req, res) => {
  const videoId = req.params.id;
  console.log("PARAMS", videoId);
  if (!req?.params?.id) {
    return res.status(400).json({ message: "Video ID required" });
  }
  const test = mongoose.Types.ObjectId(videoId);
  console.log("MKING AN OBJECTID", test);
  // const video = await Video.findOne({ id: req.params.id }).exec();
  const video = await Video.findOne({ _id: test });
  console.log("The ids", test, video._id);
  if (!video) {
    return res
      .status(204)
      .json({ message: `No Video matches ID ${req.params.id}` });
  }
  res.status(200).json({ success: true, video });
};

const createVideo = (req, res) => {
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "../uploads/");
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
    //   This is for making sure they only upload MP4 Dont know if multer will accept of types
    fileFilter: (req, file, cb) => {
      console.log("In File Filter");
      const ext = path.extname(file.originalname);
      // May have to use this in the pictures section later
      if (ext !== ".mp4") {
        return cb(res.status(400).end("only MP4 files are allowed"), false);
      }
      cb(null, true);
    },
  });
  var upload = multer({ storage: storage }).single("file");
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
};

const createThumbnail = async (req, res) => {
  console.log("I RAN HAHAHAH");
  let thumbsFilePath = "";
  let fileDuration = "";
  ffmpeg.ffprobe(req.body.filePath, function (err, metadata) {
    console.log(metadata.format.duration);
    fileDuration = metadata.format.duration;
  });
  ffmpeg(req.body.filePath)
    .on("filenames", function (filenames) {
      console.log("Will generate " + filenames.join(", "));
      thumbsFilePath = "../uploads/thumbnails/" + filenames[0];
    })
    .on("end", function () {
      console.log("Screenshots taken");
      return res.json({
        success: true,
        thumbsFilePath: thumbsFilePath,
        fileDuration: fileDuration,
      });
    })
    .screenshots({
      // Will take screens at 20%, 40%, 60% and 80% of the video
      count: 3,
      folder: "../uploads/thumbnails",
      size: "320x240",
      //   %b input basename (filename without extension)
      filename: "thumbnail-%b.png",
    });
};

const uploadVideo = async (req, res) => {
  console.log("Starting in uploadVideo");
  const video = new Video(req.body);
  video.save((err, video) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
};

module.exports = {
  createVideo,
  createThumbnail,
  uploadVideo,
  getVideos,
  getSingleVideo,
};
