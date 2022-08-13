const express = require("express");

// controller functions
const {
  getUsers,
  getUser,
  signupUser,
  loginUser,
} = require("../controllers/userController");

const router = express.Router();

//get list of users
router.get("/", getUsers);

//get One users
router.get("/:slug", getUser);

// login route
router.post("/login", loginUser);

//signUp Route
router.post("/signup", signupUser);

module.exports = router;
