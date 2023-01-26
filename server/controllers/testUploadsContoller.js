const express = require("express");
const multer = require("multer");
var ffmpeg = require("fluent-ffmpeg");
// const User = require("../models/PrimeUser");
// const User = require("../models/MillPrimeUser");

const Video = require("../models/VideoModel");
var mongoose = require("mongoose");

const uploadVideo = async (req, res) => {
  // TODO: Work on only send needed info for save
  // @route POST /upload
  // @desc  Uploads file to DB
  console.log(req.body);

  // const video = await Video.create(req.body);
  try {
    // video.save();
    return res.status(200).json({ success: true, Body: req.body });
  } catch (err) {
    return res.status(400).json({ success: false, err });
  }

  // console.log("Testing Complete");
  // res.json({ file: req.file });
};

const downloadVideo = async (req, res) => {};

module.exports = {
  uploadVideo,
  downloadVideo,
};
