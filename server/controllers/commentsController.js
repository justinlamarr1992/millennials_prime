const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");
const Video = require("../models/VideoModel");

const postComment = async (req, res) => {
  const comment = await Comment.create(req.body);

  try {
    const result = await Comment.find({ _id: comment._id })
      .populate("writer")
      .exec();

    comment.save();
    console.log(comment);

    return res.status(200).json({ success: true, result });
  } catch (err) {
    console.log(err);
    return res.json({ success: false, err });
  }
};

const getComments = async (req, res) => {
  console.log(req.body.videoId);
  videoId = req.body.videoId;
  try {
    const comments = await Comment.find({ postId: req.body.videoId })
      .populate("writer")
      .exec();
    res.status(200).json({ success: true, comments });
  } catch (err) {
    res.status(400).send(err);
  }
};

// const postReplyComment = async (req, res) => {
//   try {
//   } catch (err) {}
// };

module.exports = {
  postComment,
  getComments,
};
