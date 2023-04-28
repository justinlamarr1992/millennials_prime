// const UserTest = require("../models/User");
const User = require("../models/MillPrimeUser");
// const User = require("../models/PrimeUser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleLogin = async (req, res) => {
  const cookies = req.cookies;
  // console.log(`cookie available at login: ${JSON.stringify(cookies)}`);
  const { user, password } = req.body;
  console.log(req.body);
  console.log(user, password);
  if (!user || !password)
    return res
      .status(400)
      .json({ message: "Both Email and Password required" });

  const foundUser = await User.findOne({ username: user }).exec();
  if (!foundUser) return res.sendStatus(401); //Unauthrized
  //   evealuate password
  const match = await bcrypt.compare(password, foundUser.password);

  if (match) {
    const roles = Object.values(foundUser.roles).filter(Boolean);
    //create JWTs
    const accessToken = jwt.sign(
      { UserInfo: { username: foundUser.username, roles: roles } },
      process.env.SECRET,
      { expiresIn: "15m" }
    );
    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_SECRET,
      { expiresIn: "1d" }
    );
    const _id = foundUser._id;
    // console.log(_id);

    // save refreshtoken with current user
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();
    // console.log(result);

    res.cookie(
      "jwt",
      refreshToken,
      {
        httpOnly: true,
        sameSite: "None",
        // secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      },
      "_id",
      _id
    );
    // TODO: uncomment secure for production
    res.json({ accessToken, _id, roles });
  } else {
    res.sendStatus(401);
  }
};

module.exports = {
  handleLogin,
};
