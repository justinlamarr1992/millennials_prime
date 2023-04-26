const express = require("express");
const router = express.Router();
const Like = require("../models/Like");
const Dislike = require("../models/Dislike");

var mongoose = require("mongoose");

const getLikes = async (req, res) => {
  let varSwitch = {};
  let varFind = {};
  let variable = {};
  let videoId;
  let commentId;

  const body = req.body;

  console.log("Request Body", req.body);

  if (body.hasOwnProperty("videoId")) {
    videoId = req.body.videoId;
    variable = { videoId: req.body.videoId };
    varSwitch = new mongoose.Types.ObjectId(videoId);
    varFind = { videoId: varSwitch };
  } else {
    commentId = req.body.commentId;
    variable = { commentId: req.body.commentId };
    varSwitch = new mongoose.Types.ObjectId(commentId);
    varFind = { commentId: varSwitch };
  }

  try {
    const likes = await Like.find(varFind).exec();
    res.status(200).json({ success: true, likes });
    console.log(likes);
  } catch (err) {
    res.status(400).send(err);
  }
};

const getDislikes = async (req, res) => {
  let varSwitch = {};
  let varFind = {};
  let variable = {};
  let videoId;
  let commentId;

  const body = req.body;

  console.log(req.body);

  if (body.hasOwnProperty("videoId")) {
    videoId = req.body.videoId;
    variable = { videoId: req.body.videoId };
    varSwitch = new mongoose.Types.ObjectId(videoId);
    varFind = { videoId: varSwitch };
  } else {
    commentId = req.body.commentId;
    variable = { commentId: req.body.commentId };
    varSwitch = new mongoose.Types.ObjectId(commentId);
    varFind = { commentId: varSwitch };
  }

  try {
    const dislikes = await Dislike.find(varFind).exec();
    res.status(200).json({ success: true, dislikes });
    // console.log(dislikes);
  } catch (err) {
    res.status(400).send(err);
  }
};

const postLike = async (req, res) => {
  let variable = {};
  if (req.body.videoId) {
    variable = { videoId: req.body.videoId, userId: req.body.userId };
  } else {
    variable = { commentId: req.body.commentId, userId: req.body.userId };
  }

  try {
    const like = await Like.create(variable);
    const dislike = await Dislike.findOne(variable);
    if (dislike) {
      Dislike.findOneAndDelete(variable).exec();
    }
    res.status(200).json({ success: true, like });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ success: false, err });
  }
};

const postDislike = async (req, res) => {
  let variable = {};
  if (req.body.videoId) {
    variable = { videoId: req.body.videoId, userId: req.body.userId };
  } else {
    variable = { commentId: req.body.commentId, userId: req.body.userId };
  }

  try {
    const dislike = await Dislike.create(variable);
    const like = await Like.findOne(variable).exec();
    if (like) {
      Like.findOneAndDelete(variable).exec();
    }
    res.status(200).json({ success: true, dislike });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ success: false, err });
  }
};

const postUnlike = async (req, res) => {
  let variable = {};
  if (req.body.videoId) {
    variable = { videoId: req.body.videoId, userId: req.body.userId };
  } else {
    variable = { commentId: req.body.commentId, userId: req.body.userId };
  }

  try {
    Like.findOneAndDelete(variable).exec();
    res.status(200).json({ success: true });
  } catch (err) {
    console.log("There has been an error of ", err);
    return res.status(400).json({ success: false, err });
  }
};

const postUndislike = async (req, res) => {
  let variable = {};
  if (req.body.videoId) {
    variable = { videoId: req.body.videoId, userId: req.body.userId };
  } else {
    variable = { commentId: req.body.commentId, userId: req.body.userId };
  }

  try {
    Dislike.findOneAndDelete(variable).exec();
    res.status(200).json({ success: true });
  } catch (err) {
    console.log("There has been an error of ", err);
    return res.status(400).json({ success: false, err });
  }
};

module.exports = {
  getLikes,
  getDislikes,
  postLike,
  postDislike,
  postUnlike,
  postUndislike,
};
