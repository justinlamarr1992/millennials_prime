const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    const userInfo = decoded?.UserInfo;
    if (!userInfo || !userInfo._id) return res.sendStatus(403);
    req.user = userInfo.username;
    req.roles = userInfo.roles;
    req.userId = userInfo._id;
    next();
  });
};

module.exports = verifyJWT;
