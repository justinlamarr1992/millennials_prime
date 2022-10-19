const User = require("../models/MillPrimeUser");
const bcrypt = require("bcrypt");

// const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  console.log(cookies.jwt);
  const refreshToken = cookies.jwt;
  //   res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) return res.sendStatus(403);

  //   evaluate jwt
  jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username)
      return res.sendStatus(403);
    const roles = Object.values(foundUser.roles);
    const accessToken = jwt.sign(
      {
        UserInfo: { username: decoded.username, roles: roles },
      },
      process.env.SECRET,
      { expiresIn: "24h" }
    );
    res.json({ roles, accessToken });
  });
};

module.exports = { handleRefreshToken };
