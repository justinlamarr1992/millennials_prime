const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(401);
  console.log(authHeader);

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.user = decoded.username;
    next();
  });
};
// const verifyJWT = (req, res, next) => {
//   const authHeader = req.headers.authorization || req.headers.Authorization;
//   console.log("It fired is JWT");
//   console.log("AuthHeaders", authHeader);

//   if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);

//   const token = authHeader.split(" ")[1];
//   console.log(token);
//   console.log("It split the token");
//   jwt.verify(token, process.env.SECRET, (err, decoded) => {
//     if (err) return res.sendStatus(403); //invalid token
//     req.user = decoded.UserInfo.username;
//     req.roles = decoded.UserInfo.roles;
//     next();
//   });
// };

module.exports = verifyJWT;

// FIGURE OUT WHEE THE HEADERS ARE
