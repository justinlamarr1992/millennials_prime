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
    const likes = await Like.find({ variable }).exec();
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
    variable = { videoId: req.body.videoId, userId: req.body.userId };
  } else {
    variable = { commentId: req.body.commentId, userId: req.body.userId };
  }
  console.log(variable);

  try {
    const like = await Like.create(variable);
    Dislike.findByIdAndDelete(variable).exec();
    res.status(200).json({ success: true, like });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ success: false, err });
  }

  // try {
  // const like = await Like.save(variable);
  // This saves the data to Mongo
  // try {
  //   Dislike.findByIdAndDelete(variable);
  //   console.log("Dislike ran");

  //   res.status(200).json({ success: true });
  // } catch (err) {
  //   console.log("Error happened in the secondary try");

  //   return res.status(400).json({ success: false, err });
  // }
  // res.status(200).json({ success: true, like });
  // } catch (err) {
  //   console.log("Error happened in the main try");
  //   return res.json({ success: false, err });
  // }
};
const postDislike = async (req, res) => {
  console.log("Fired the post Dislike");
  let variable = {};
  if (req.body.videoId) {
    variable = { videoId: req.body.videoId, userId: req.body.userId };
  } else {
    variable = { commentId: req.body.commentId, userId: req.body.userId };
  }
  console.log(variable);

  try {
    const dislike = await Dislike.create(variable);

    const like = await Like.findOneAndDelete(variable).exec();
    if (like) {
      res.json(like);
    }
    res.status(200).json({ success: true, dislike });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ success: false, err });
  }
};
const postUnlike = async (req, res) => {
  console.log("Fired the post Unlikes");
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
  console.log("Fired the post Undislikes");
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
