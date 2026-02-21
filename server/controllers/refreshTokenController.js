const User = require("../models/MillPrimeUser");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJwtAsync = (token, secret) =>
  new Promise((resolve, reject) =>
    jwt.verify(token, secret, (err, decoded) => (err ? reject(err) : resolve(decoded)))
  );

const handleRefreshToken = async (req, res) => {
  try {
    // Accept refresh token from request body (mobile) or cookie (web)
    const refreshToken = req.body?.refreshToken || req.cookies?.jwt;
    if (!refreshToken) return res.sendStatus(401);

    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) return res.sendStatus(403);

    const decoded = await verifyJwtAsync(refreshToken, process.env.REFRESH_SECRET);
    if (foundUser.username !== decoded.username) return res.sendStatus(403);

    const roles = Object.values(foundUser.roles);
    const accessToken = jwt.sign(
      { UserInfo: { username: decoded.username, roles, _id: foundUser._id } },
      process.env.SECRET,
      { expiresIn: "24h" }
    );

    // Rotate refresh token — issue a new one and persist it
    const newRefreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_SECRET,
      { expiresIn: "1d" }
    );
    foundUser.refreshToken = newRefreshToken;
    await foundUser.save();

    // Return new refresh token in body so mobile clients can store it in SecureStore
    res.json({ roles, accessToken, _id: foundUser._id, refreshToken: newRefreshToken });
  } catch (err) {
    res.sendStatus(403);
  }
};

module.exports = { handleRefreshToken };
