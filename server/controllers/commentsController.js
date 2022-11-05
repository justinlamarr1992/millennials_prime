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

module.exports = {
  postComment,
};
