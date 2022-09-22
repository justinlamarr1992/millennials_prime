const express = require("express");

const { getUser } = require("../controllers/userController");

const router = express.Router();

const { auth } = require("../middleware/auth");

router.get("/getUser", getUser);
// router.post("/signup", signupUser);
// router.post("/login", loginUser);
// router.get("/logout", logoutUser);

module.exports = router;

// // controller functions
// const {
//   getUsers,
//   getUser,
//   signupUser,
//   loginUser,
// } = require("../controllers/userController");

// const router = express.Router();

// //get list of users
// router.get("/", getUsers);

// //get One users
// router.get("/:slug", getUser);

// // login route
// router.post("/login", loginUser);

// //signUp Route
// router.post("/signup", signupUser);

// module.exports = router;
