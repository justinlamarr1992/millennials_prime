const express = require("express");
const router = express.Router();
const Like = require("../models/Like");
const Dislike = require("../models/Dislike");

const getLikes = async (req, res) => {
  console.log("Fired Get likes");
  // try {
  //   const likes = await (await Like.find({})).exec();
  //   res.status(200).json({ success: true, likes });
  // } catch (err) {
  //   res.status(400).send(err);
  // }
};

const postLikes = async (req, res) => {
  console.log("Fired the post Likes");
};

// const postReplyComment = async (req, res) => {
//   try {
//   } catch (err) {}
// };

module.exports = {
  getLikes,
  postLikes,
};
