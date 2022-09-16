const { User } = require("../models/userModel");

const getUser = async (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
};

const signupUser = async (req, res) => {
  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
};

const loginUser = async (req, res) => {
  console.log("Third Secion is UserController.js");

  // const user = await User.findOne({
  //   email: req.body.dataToSubmit.email,
  // }).exec();
  // console.log(user);

  User.findOne({ email: req.body.dataToSubmit.email }, (err, user) => {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: "Auth failed, email not found, but the message is hardcoded",
      });
    console.log(err);

    user.comparePassword(req.body.dataToSubmit.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSuccess: false, message: "Wrong password" });

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie("w_authExp", user.token).status(200).json({
          loginSuccess: true,
          userId: user._id,
          name: user.name,
          email: user.email,
          token: user.token,
          role: user.role,
          _id: user._id,
          timeNow: new Date(),
        });
      });
    });

    console.log(user);
  });
};

const logoutUser = async (req, res) => {
  User.findOneAndUpdate(
    { _id: req.userId },
    { token: "", tokenExp: "" },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
      });
    }
  );
};

module.exports = { getUser, signupUser, loginUser, logoutUser };

// const jwt = require("jsonwebtoken");

// const createToken = (_id) => {
//   return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1d" });
// };

// const getUsers = async (req, res) => {
//   const users = await User.find({}).sort({ createdAt: -1 });

//   res.status(200).json(users);
// };

// const getUser = async (req, res) => {
//   // const id = req.user._id;
//   const user = await User.findOne({ _id: req.params.slug }).sort({
//     createdAt: -1,
//   });

//   res.status(200).json(user);
// };

// // login user
// const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.login(email, password);

//     // create a token
//     const token = createToken(user._id);

//     res.status(200).json({ email, token });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // sign up user
// const signupUser = async (req, res) => {
//   // TODO: Make unique user handle from the name submitted
//   // ideals on this would be i.e. justinwilliams, justinwilliams1
//   // this way the database would have a method of fetch all the users information from that and be abled to redirect
//   // users to the user/users/justinwilliams1 and everything else related to the user
//   const { email, password, name } = req.body;
//   try {
//     const user = await User.signup(email, password, name);

//     // create a token
//     const token = createToken(user._id);

//     res.status(200).json({ email, token, name });
//   } catch (error) {
//     console.log("Here");
//     res.status(400).json({ error: error.message });
//   }
// };

// module.exports = { getUsers, getUser, signupUser, loginUser };
