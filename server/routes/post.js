const express = require("express");

const {
  createPost,
  getPosts,
  getPost,
  deletePost,
  updatePost,
} = require("../controllers/postController");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all post
router.use(requireAuth);

// GET all Post
router.get("/", getPosts);

// GET a single Post
router.get("/:id", getPost);

// POST a new Post
router.post("/", createPost);

// Delete a Post
router.delete("/:id", deletePost);

// UPDATE a Post
router.patch("/:id", updatePost);

module.exports = router;
