const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1d" });
};

const getUsers = async (req, res) => {
  const users = await User.find({}).sort({ createdAt: -1 });

  res.status(200).json(users);
};

const getUser = async (req, res) => {
  // const id = req.user._id;
  const user = await User.findOne({ _id: req.params.slug }).sort({
    createdAt: -1,
  });

  res.status(200).json(user);
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// sign up user
const signupUser = async (req, res) => {
  // TODO: Make unique user handle from the name submitted
  // ideals on this would be i.e. justinwilliams, justinwilliams1
  // this way the database would have a method of fetch all the users information from that and be abled to redirect
  // users to the user/users/justinwilliams1 and everything else related to the user
  const { email, password, name } = req.body;
  try {
    const user = await User.signup(email, password, name);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token, name });
  } catch (error) {
    console.log("Here");
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getUsers, getUser, signupUser, loginUser };
