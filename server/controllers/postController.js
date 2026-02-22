const Post = require("../models/postModel");
const User = require("../models/MillPrimeUser");
const mongoose = require("mongoose");

const POPULATE_FIELDS = "name username prime roles";

const isValidId = (id, label, res) => {
  if (!mongoose.isValidObjectId(id)) {
    res.status(400).json({ success: false, message: `Invalid ${label}` });
    return false;
  }
  return true;
};

const fetchPostsByAuthor = (authorId) =>
  Post.find({ author: authorId })
    .populate("author", POPULATE_FIELDS)
    .sort({ createdAt: -1 })
    .exec();

const findAuthorizedPost = async (id, userId, res) => {
  const post = await Post.findById(id);
  if (!post) {
    res.status(404).json({ success: false, message: "Post not found" });
    return null;
  }
  if (post.author.toString() !== userId) {
    res.status(403).json({ success: false, message: "Not authorized" });
    return null;
  }
  return post;
};

const toPostResponse = (doc) => {
  const author = doc.author;
  const post = {
    id: doc._id.toString(),
    type: doc.type,
    title: doc.title,
    description: doc.description,
    authorId: author._id.toString(),
    authorName: author.name || author.username || "Unknown",
    isPrime: !!author.prime,
    isAdmin: !!author.roles?.Admin,
    createdAt: doc.createdAt.toISOString(),
    likeCount: doc.likeCount,
    commentCount: doc.commentCount,
  };
  if (doc.type === "picture") post.imageUrl = doc.imageUrl;
  if (doc.type === "video") post.videoId = doc.videoId;
  return post;
};

const getOwnPosts = async (req, res) => {
  try {
    const docs = await fetchPostsByAuthor(req.userId);
    const posts = docs.map(toPostResponse);
    res.status(200).json({ success: true, posts, totalCount: posts.length });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getUserPosts = async (req, res) => {
  if (!isValidId(req.params.userId, "userId", res)) return;
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    const docs = await fetchPostsByAuthor(req.params.userId);
    const posts = docs.map(toPostResponse);
    res.status(200).json({ success: true, posts, totalCount: posts.length });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const createPost = async (req, res) => {
  const { type, title, description, imageUrl, videoId } = req.body;

  if (!type) {
    return res.status(400).json({ success: false, message: "type is required" });
  }
  if (!["text", "picture", "video"].includes(type)) {
    return res.status(400).json({ success: false, message: "Invalid post type" });
  }
  if (!title) {
    return res.status(400).json({ success: false, message: "title is required" });
  }
  if (type === "picture" && !imageUrl) {
    return res.status(400).json({ success: false, message: "imageUrl is required for picture posts" });
  }
  if (type === "video" && !videoId) {
    return res.status(400).json({ success: false, message: "videoId is required for video posts" });
  }

  try {
    const doc = await Post.create({
      type,
      title,
      description: description || "",
      author: req.userId,
      ...(type === "picture" && { imageUrl }),
      ...(type === "video" && { videoId }),
    });
    const populated = await doc.populate("author", POPULATE_FIELDS);
    res.status(201).json({ success: true, post: toPostResponse(populated) });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const updatePost = async (req, res) => {
  if (!isValidId(req.params.id, "post id", res)) return;
  try {
    const post = await findAuthorizedPost(req.params.id, req.userId, res);
    if (!post) return;
    const { title, description, imageUrl, videoId } = req.body;
    if (title !== undefined) post.title = title;
    if (description !== undefined) post.description = description;
    if (post.type === "picture" && imageUrl !== undefined) post.imageUrl = imageUrl;
    if (post.type === "video" && videoId !== undefined) post.videoId = videoId;
    await post.save();
    const populated = await post.populate("author", POPULATE_FIELDS);
    res.status(200).json({ success: true, post: toPostResponse(populated) });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const deletePost = async (req, res) => {
  if (!isValidId(req.params.id, "post id", res)) return;
  try {
    const post = await findAuthorizedPost(req.params.id, req.userId, res);
    if (!post) return;
    await post.deleteOne();
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getOwnPosts, getUserPosts, createPost, updatePost, deletePost };
