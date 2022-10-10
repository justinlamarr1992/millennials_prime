const usersDb = {
  users: require("../models/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
// const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// const handleRefreshToken = (req, res) => {
//   const cookies = req.cookies;
//   console.log("The cookies are", cookies);

//   if (!cookies?.jwt) return res.sendStatus(401);

//   const refreshToken = cookies.jwt;

//   res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });

//   const foundUser = await User.findOne({ refreshToken }).exec();

//   // Detected refresh token reuse!
//   if (!foundUser) {
//     jwt.verify(refreshToken, process.env.SECRET, async (err, decoded) => {
//       if (err) return res.sendStatus(403); //Forbidden
//       //Delete refresh tokens of hacked user
//       const hackedUser = await User.findOne({
//         username: decoded.username,
//       }).exec();
//       hackedUser.refreshToken = [];
//       const result = await hackedUser.save();
//     });
//     return res.sendStatus(403); //Forbidden
//   }
//   const newRefreshTokenArray = foundUser.refreshToken.filter(
//     (rt) => rt !== refreshToken
//   );

//   //evaluate jwt
//   jwt.verify(refreshToken, process.env.REFRESH_SECRET, async (err, decoded) => {
//     if (err) {
//       //expired refresh token
//       foundUser.refreshToken = [...newRefreshTokenArray];
//       const result = await foundUser.save();
//     }
//     if (err || foundUser.username !== decoded.username)
//       return res.sendStatus(403);

//     //Refresh token still valid
//     const roles = Object.values(foundUser.roles);
//     const accessToken = jwt.sign(
//       {
//         UserInfo: {
//           username: decoded.username,
//           roles: roles,
//         },
//       },
//       process.env.SECRET,
//       // TODO: Super short
//       { expiresIn: "10s" }
//     );

//     const newRefreshToken = jwt.sign(
//       { username: foundUser.username },
//       process.env.REFRESH_SECRET,
//       // TODO: Super short

//       { expiresIn: "15s" }
//     );

//     //Saving refreshToken with current user
//     foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
//     const result = await foundUser.save();

//     //Creates Secure Cookie with refresh token
//     res.cookie("jwt", newRefreshToken, {
//       httpOnly: true,
//       secure: true,
//       sameSite: "None",
//       maxAge: 24 * 60 * 60 * 1000,
//     });

//     res.json({ accessToken });
//   });
// };
const handleRefreshToken = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  console.log(cookies.jwt);
  const refreshToken = cookies.jwt;
  //   res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  const foundUser = usersDb.users.find(
    (person) => person.refreshToken === refreshToken
  );
  if (!foundUser) return res.sendStatus(403);

  //   evlautae jwt
  jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username)
      return res.sendStatus(403);
    const roles = Oject.values(foundUser.roles);
    const accessToken = jwt.sign(
      {
        UserInfo: { username: decoded.username, roles: roles },
      },
      process.env.SECRET,
      { expiresIn: "30s" }
    );
    res.json({ accessToken });
  });
  //   // Detected refresh token reuse!
  //   if (!foundUser) {
  //     jwt.verify(refreshToken, process.env.SECRET, async (err, decoded) => {
  //       if (err) return res.sendStatus(403); //Forbidden
  //       //Delete refresh tokens of hacked user
  //       const hackedUser = await User.findOne({
  //         username: decoded.username,
  //       }).exec();
  //       hackedUser.refreshToken = [];
  //       const result = await hackedUser.save();
  //     });
  //     return res.sendStatus(403); //Forbidden
  //   }
  //   const newRefreshTokenArray = foundUser.refreshToken.filter(
  //     (rt) => rt !== refreshToken
  //   );

  //   //evaluate jwt
  //   jwt.verify(refreshToken, process.env.REFRESH_SECRET, async (err, decoded) => {
  //     if (err) {
  //       //expired refresh token
  //       foundUser.refreshToken = [...newRefreshTokenArray];
  //       const result = await foundUser.save();
  //     }
  //     if (err || foundUser.username !== decoded.username)
  //       return res.sendStatus(403);

  //     //Refresh token still valid
  //     const roles = Object.values(foundUser.roles);
  //     const accessToken = jwt.sign(
  //       {
  //         UserInfo: {
  //           username: decoded.username,
  //           roles: roles,
  //         },
  //       },
  //       process.env.SECRET,
  //       // TODO: Super short
  //       { expiresIn: "10s" }
  //     );

  //     const newRefreshToken = jwt.sign(
  //       { username: foundUser.username },
  //       process.env.REFRESH_SECRET,
  //       // TODO: Super short

  //       { expiresIn: "15s" }
  //     );

  //     //Saving refreshToken with current user
  //     foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
  //     const result = await foundUser.save();

  //     //Creates Secure Cookie with refresh token
  //     res.cookie("jwt", newRefreshToken, {
  //       httpOnly: true,
  //       secure: true,
  //       sameSite: "None",
  //       maxAge: 24 * 60 * 60 * 1000,
  //     });

  //     res.json({ accessToken });
  //   });
};

module.exports = { handleRefreshToken };
