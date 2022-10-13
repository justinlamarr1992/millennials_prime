const express = require("express");
const multer = require("multer");
var ffmpeg = require("fluent-ffmpeg");
const User = require("../models/MillPrimeUser");
const Video = require("../models/VideoModel");
var mongoose = require("mongoose");

const createVideo = async (req, res) => {
  console.log("starting in controller");

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
  console.log("Starting Thumbnail back end");
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
  const video = new Video(req.body);
  video.save((err, video) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
};

const getVideos = async (req, res) => {
  const videos = await Video.find().populate("title");
  if (!videos) return res.status(204).json({ message: `No Videos ` });
  res.status(200).json({ success: true, videos });
};

const getSingleVideo = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "Video ID required" });

  const video = await Video.findOne({ _id: req.params.id }).exec();
  // mongoose.Types.ObjectId.isValid("your id here");
  if (!video) {
    return res
      .status(204)
      .json({ message: `No Video matches ID ${req.params.id}` });
  }
  res.status(200).json({ success: true, video });

  // Video.findOne({ _id: req.body.videoId })
  //   // .populate("userPosting") THIS WILL BE LATER
  //   // FOR NOW JUST USE PRIME VIEWS VS REGULAR
  //   .exec((err, video) => {
  //     if (err) return res.status(400).send(err);
  //     res.status(200).json({ success: true, video });
  //   });
};

module.exports = {
  createVideo,
  createThumbnail,
  uploadVideo,
  getVideos,
  getSingleVideo,
};
