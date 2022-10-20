// const UserTest = require("../models/User");
const User = require("../models/MillPrimeUser");
// const User = require("../models/PrimeUser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleLogin = async (req, res) => {
  const cookies = req.cookies;
  console.log(`cookie available at login: ${JSON.stringify(cookies)}`);
  const { user, password } = req.body;
  // console.log(req.body);
  // console.log(user, password);
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
    console.log(_id);

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

//   if (match) {
//     const roles = Object.values(foundUser.roles).filter(Boolean);
//     // create JWTs
//     const accessToken = jwt.sign(
//       {
//         UserInfo: {
//           username: foundUser.username,
//           roles: roles,
//         },
//       },
//       process.env.SECRET,
//       { expiresIn: "10s" }
//     );
//     const newRefreshToken = jwt.sign(
//       { username: foundUser.username },
//       process.env.REFRESH_SECRET,
//       { expiresIn: "1d" }
//     );

//     // Changed to let keyword
//     let newRefreshTokenArray = !cookies?.jwt
//       ? foundUser.refreshToken
//       : foundUser.refreshToken.filter((rt) => rt !== cookies.jwt);

//     if (cookies?.jwt) {
//       /*
//             Scenario added here:
//                 1) User logs in but never uses RT and does not logout
//                 2) RT is stolen
//                 3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
//             */
//       const refreshToken = cookies.jwt;
//       const foundToken = await User.findOne({ refreshToken }).exec();

//       // Detected refresh token reuse!
//       if (!foundToken) {
//         console.log("attempted refresh token reuse at login!");
//         // clear out ALL previous refresh tokens
//         newRefreshTokenArray = [];
//       }

//       res.clearCookie("jwt", {
//         httpOnly: true,
//         sameSite: "None",
//         secure: true,
//       });
//     }

//     // Saving refreshToken with current user
//     foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
//     const result = await foundUser.save();
//     console.log(result);
//     console.log(roles);

//     // Creates Secure Cookie with refresh token
//     res.cookie("jwt", newRefreshToken, {
//       httpOnly: true,
//       secure: true,
//       sameSite: "None",
//       maxAge: 24 * 60 * 60 * 1000,
//     });

//     // Send authorization roles and access token to user
//     res.json({ roles, accessToken });
//   } else {
//     res.sendStatus(401);
//   }
// };

module.exports = {
  handleLogin,
};
