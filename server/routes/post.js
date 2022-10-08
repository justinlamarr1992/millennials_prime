// const express = require("express");

// const {
//   createPost,
//   createPicPost,
//   testPost,
//   getPosts,
//   getProfilePosts,
//   getPost,
//   deletePost,
//   updatePost,
// } = require("../controllers/postController");

// const requireAuth = require("../middleware/requireAuth");

// const router = express.Router();

// // require auth for all post
// router.use(requireAuth);

// // GET all Post
// router.get("/", getPosts);

// // GET Profile Post
// router.get("/profile", getProfilePosts);

// // GET a single Post
// router.get("/:id", getPost);

// // POST a new Post
// router.post("/", createPost);
// // POST a Test Post
// router.post("/test", testPost);
// // POST PICTURE POST
// router.post("/photo", createPicPost);

// // Delete a Post
// router.delete("/:id", deletePost);

// // UPDATE a Post
// router.patch("/:id", updatePost);

// module.exports = router;
