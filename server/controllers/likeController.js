const express = require("express");
const router = express.Router();
const Like = require("../models/Like");
const Dislike = require("../models/Dislike");

const getLikes = async (req, res) => {
  console.log(req.body);

  let variable = {};
  if (req.body.videoId) {
    variable = { videoId: req.body.videoId };
  } else {
    variable = { commentId: req.body.commentId };
  }
  console.log(variable);

  try {
    const likes = await Like.create({ variable }).exec();
    res.status(200).json({ success: true, likes });
    console.log(likes);
  } catch (err) {
    res.status(400).send(err);
  }

  console.log("It fired in the back end");
};
const getDislikes = async (req, res) => {
  console.log(req.body);

  let variable = {};
  if (req.body.videoId) {
    variable = { videoId: req.body.videoId };
  } else {
    variable = { commentId: req.body.commentId };
  }
  console.log(variable);

  try {
    const dislikes = await Dislike.find({ variable }).exec();
    res.status(200).json({ success: true, dislikes });
    console.log(dislikes);
  } catch (err) {
    res.status(400).send(err);
  }

  console.log("It fired in the back end");
};

const postLike = async (req, res) => {
  let variable = {};
  if (req.body.videoId) {
    variable = { videoId: req.body.videoId };
  } else {
    variable = { commentId: req.body.commentId };
  }
  // console.log(variable);

  try {
    const like = new Like(variable);
    // This saves the data to Mongo
    try {
      Dislike.findByIdAndDelete(variable);
      console.log("Dislike ran");

      res.status(200).json({ success: true });
    } catch (err) {
      return res.status(400).json({ success: false, err });
    }
  } catch (err) {
    return res.json({ success: false, err });
  }
};
const postDislike = async (req, res) => {
  console.log("Fired the post Dislike");
};
const postUnlike = async (req, res) => {
  console.log("Fired the post Unlikes");
};
const postUndislike = async (req, res) => {
  console.log("Fired the post Undislikes");
};

module.exports = {
  getLikes,
  getDislikes,
  postLike,
  postDislike,
  postUnlike,
  postUndislike,
};
