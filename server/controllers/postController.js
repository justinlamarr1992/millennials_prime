const Post = require("../models/postModel");
const User = require("../models/userModel");
const mongoose = require("mongoose");
const { db } = require("../models/userModel");

// Get all post
const getPosts = async (req, res) => {
  const posts = await Post.find({}).sort({ createdAt: -1 });

  res.status(200).json(posts);
};

// will be used for all friends/ connections post
// // get all post
// const getPosts = async (req, res) => {
//   const posts = await Post.find({}).sort({ createdAt: -1 });

//   res.status(200).json(posts);
// };

// Get profile post
const getProfilePosts = async (req, res) => {
  const user_id = req.user._id;
  const posts = await Post.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(posts);
};

// get sinlge post
const getPost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "This Post doesn't Exist" });
  }

  const post = await Post.findById(id);

  if (!post) {
    return res.status(404).json({ error: "This Post doesn't Exist" });
  }

  res.status(200).json(post);
};

// create new post
const createPost = async (req, res) => {
  const { title, status, name } = req.body;
  const user_id = req.user._id;

  // const user = await User.findOne({ _id: _id });
  // console.log(user);

  // const test = await db.getUsers();

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!status) {
    emptyFields.push("status");
  }
  if (!name) {
    emptyFields.push("name");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please Fill in all the fields", emptyFields });
  }

  //   add doc to db
  try {
    const user_id = req.user._id;
    // These are all the things that will be saved for a post
    const post = await Post.create({ title, status, user_id, name });
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// ADD To DATABASE NOTES
// in order to save to database you need to add object here ...{title,status, name} =req.body this is whats sent in the front end

// create new post
const testPost = async (req, res) => {
  const { title, status } = req.body;
  const user_id = req.user._id;

  const user = await User.findOne({ _id: _id });
  // console.log(user);

  // const test = await db.getUsers();

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!status) {
    emptyFields.push("status");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please Fill in all the fields", emptyFields });
  }

  //   add doc to db
  try {
    const user_id = req.user._id;
    // These are all the things that will be saved for a post
    const post = await Post.create({ title, status, user_id });
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// create post for pictures
const createPicPost = async (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No File Uplaoded" });
  }
  console.log("req.files.file: ", req.files.file);

  const file = req.files.file;
  file.mv(`../client/public/uploads/${file.name}`, (err) => {
    if (err) {
      console.error(err);
      console.log("Error in back end");
      return res.status(500).send(err);
    }
    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
};

// delete a post
const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "This Post doesn't Exist" });
  }

  const post = await Post.findByIdAndDelete({ _id: id });

  if (!post) {
    return res.status(400).json({ error: "This Post doesn't Exist" });
  }

  res.status(200).json(post);
};

// update a post
const updatePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "This Post doesn't Exist" });
  }

  const post = await Post.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!post) {
    return res.status(404).json({ error: "This Post doesn't Exist" });
  }

  res.status(200).json(post);
};

module.exports = {
  createPost,
  createPicPost,
  getPosts,
  getProfilePosts,
  getPost,
  deletePost,
  updatePost,
  testPost,
};
