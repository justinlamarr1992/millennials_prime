const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  deleteUser,
  //   getUser,
} = require("../controllers/userController");

// const { auth } = require("../middleware/auth");

router.get("/getuser", getAllUsers);
router.delete("/delete", deleteUser);
// router.get("/one/:id", getUser);
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
