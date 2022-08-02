const User = require("../models/userModel");

// login user
const loginUser = async (req, res) => {
  res.json({ mssg: "login user" });
};

// sign up user
const signupUser = async (req, res) => {
  res.json({ mssg: "login user" });
};

module.exports = { signupUser, loginUser };
