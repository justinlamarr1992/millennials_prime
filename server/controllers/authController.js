const usersDb = {
  users: require("../models/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const fsPromises = require("fs").promises;
const path = require("path");

const handleLogin = async (req, res) => {
  const { user, password } = req.body;
  console.log(req.body);
  // console.log(user, password);
  if (!user || !password)
    return res
      .status(400)
      .json({ message: "Both Email and Password required" });

  const foundUser = await usersDb.users.find(
    (person) => person.username === user
  );
  if (!foundUser) return res.sendStatus(401); //Unauthrized
  //   evealuate password
  const match = await bcrypt.compare(password, foundUser.password);
  // if (match) {
  //   const roles = Object.values(foundUser.roles).filter(Boolean);
  //   console.log("It ran here");
  //   // create JWT
  //   const accessToken = jwt.sign(
  //     {
  //       UserInfo: {
  //         username: foundUser.username,
  //         roles: roles,
  //       },
  //     },
  //     process.env.SECRET,
  //     // TODO: SUPER SHORT CHANGE THIS
  //     { expiresIn: "24h" }
  //   );
  //   const newRefreshToken = jwt.sign(
  //     { username: foundUser.username },
  //     process.env.SECRET,
  //     // TODO: SUPER SHORT CHANGE THIS
  //     { expiresIn: "1d" }
  //   );
  //   let newRefreshTokenArray = !cookies?.jwt
  //     ? foundUser.refreshToken
  //     : foundUser.refreshToken.filter((rt) => rt !== cookies.jwt);
  //   if (cookies?.jwt) {
  //     /*
  //           Scenario added here:
  //               1) User logs in but never uses RT and does not logout
  //               2) RT is stolen
  //               3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
  //           */
  //     const refreshToken = cookies.jwt;
  //     const foundToken = await User.findOne({ refreshToken }).exec();
  //     // detected refreshtoken reuse
  //     if (!foundToken) {
  //       // clearout all other tokens
  //       newRefreshTokenArray = [];
  //     }
  //     res.clearCookie("jwt", {
  //       httpOnly: true,
  //       sameSite: "None",
  //       secure: true,
  //     });
  //   }
  //   // saving refresh token for current user
  //   foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
  //   const result = await foundUser.save();
  //   // create Secure Cookie with current user
  //   res.cookie("jwt", newRefreshToken, {
  //     httpOnly: true,
  //     secure: true,
  //     sameSite: "None",
  //     maxAge: 24 * 60 * 60 * 1000,
  //   });
  //   // send authorization roles and access token to user
  //   res.json({ accessToken, roles });
  // } else {
  //   res.sendStatus(401);
  // }
  if (match) {
    //create JWTs
    const accessToken = jwt.sign(
      { username: foundUser.username },
      process.env.SECRET,
      { expiresIn: "30s" }
    );
    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_SECRET,
      { expiresIn: "1d" }
    );

    // save refreshtoken with current user
    const otherUsers = usersDb.users.filter(
      (person) => person.username !== foundUser.username
    );
    const currentUser = { ...foundUser, refreshToken };
    usersDb.setUsers([...otherUsers, currentUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "models", "users.json"),
      JSON.stringify(usersDb.users)
    );
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
  } else {
    res.sendStatus(401);
  }
  // if (!cookies) {
  //   console.log("We have No End Cookies");
  // } else {
  //   console.log("The End cookies are", cookies);
  // }
};
const login = async (req, res) => {
  //   const cookies = req.cookies;
  //   if (!cookies) {
  //     console.log("We have No Beginning Cookies");
  //   } else {
  //     console.log("The Beginning cookies are", cookies);
  //   }
  //   const { user, password } = req.body;
  //   console.log(req.body);
  //   // console.log(user, password);
  //   if (!user || !password)
  //     return res
  //       .status(400)
  //       .json({ message: "Both Email and Password required" });
  //   const foundUser = await User.findOne({ username: user }).exec();
  //   if (!foundUser) return res.sendStatus(401); //Unauthrized
  //   //   evealuate password
  //   const match = await bcrypt.compare(password, foundUser.password);
  //   if (match) {
  //     const roles = Object.values(foundUser.roles).filter(Boolean);
  //     console.log("It ran here");
  //     // create JWT
  //     const accessToken = jwt.sign(
  //       {
  //         UserInfo: {
  //           username: foundUser.username,
  //           roles: roles,
  //         },
  //       },
  //       process.env.SECRET,
  //       // TODO: SUPER SHORT CHANGE THIS
  //       { expiresIn: "24h" }
  //     );
  //     const newRefreshToken = jwt.sign(
  //       { username: foundUser.username },
  //       process.env.SECRET,
  //       // TODO: SUPER SHORT CHANGE THIS
  //       { expiresIn: "1d" }
  //     );
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
  //       // detected refreshtoken reuse
  //       if (!foundToken) {
  //         // clearout all other tokens
  //         newRefreshTokenArray = [];
  //       }
  //       res.clearCookie("jwt", {
  //         httpOnly: true,
  //         sameSite: "None",
  //         secure: true,
  //       });
  //     }
  //     // saving refresh token for current user
  //     foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
  //     const result = await foundUser.save();
  //     // create Secure Cookie with current user
  //     res.cookie("jwt", newRefreshToken, {
  //       httpOnly: true,
  //       secure: true,
  //       sameSite: "None",
  //       maxAge: 24 * 60 * 60 * 1000,
  //     });
  //     // send authorization roles and access token to user
  //     res.json({ accessToken, roles });
  //   } else {
  //     res.sendStatus(401);
  //   }
  //   if (!cookies) {
  //     console.log("We have No End Cookies");
  //   } else {
  //     console.log("The End cookies are", cookies);
  //   }
};

const register = async (req, res) => {
  const { user, password } = req.body;
  if (!user || !password)
    return res.status(400).json({ message: "Email and Password required" });

  // check for duplicates usernames in the db
  const duplicate = await User.findOne({ username: user }).exec();
  if (duplicate) return res.sendStatus(409); //conflict

  try {
    //encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create and store the new user
    const result = await User.create({
      username: user,
      password: hashedPassword,
    });
    console.log(result);
    res.status(201).json({ success: `New user ${user} created` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const logout = async (req, res) => {
  // on Client also delete accessToken

  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  const refreshToken = cookies.jwt;

  // Is refreshtoken in db?
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204);
  }

  //   Delete refreshToken in db
  foundUser.refreshToken = foundUser.refreshToken.filter(
    (rt) => rt !== refreshToken
  );
  const result = await foundUser.save();
  console.log(result);

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.sendStatus(204);
};

const refreshToken = async (req, res) => {
  // const cookies = req.cookies;
  // console.log("The cookies are", cookies);
  // if (!cookies?.jwt) return res.sendStatus(401);
  // const refreshToken = cookies.jwt;
  // res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  // const foundUser = await User.findOne({ refreshToken }).exec();
  // // Detected refresh token reuse!
  // if (!foundUser) {
  //   jwt.verify(refreshToken, process.env.SECRET, async (err, decoded) => {
  //     if (err) return res.sendStatus(403); //Forbidden
  //     //Delete refresh tokens of hacked user
  //     const hackedUser = await User.findOne({
  //       username: decoded.username,
  //     }).exec();
  //     hackedUser.refreshToken = [];
  //     const result = await hackedUser.save();
  //   });
  //   return res.sendStatus(403); //Forbidden
  // }
  // const newRefreshTokenArray = foundUser.refreshToken.filter(
  //   (rt) => rt !== refreshToken
  // );
  // //evaluate jwt
  // jwt.verify(refreshToken, process.env.REFRESH_SECRET, async (err, decoded) => {
  //   if (err) {
  //     //expired refresh token
  //     foundUser.refreshToken = [...newRefreshTokenArray];
  //     const result = await foundUser.save();
  //   }
  //   if (err || foundUser.username !== decoded.username)
  //     return res.sendStatus(403);
  //   //Refresh token still valid
  //   const roles = Object.values(foundUser.roles);
  //   const accessToken = jwt.sign(
  //     {
  //       UserInfo: {
  //         username: decoded.username,
  //         roles: roles,
  //       },
  //     },
  //     process.env.SECRET,
  //     // TODO: Super short
  //     { expiresIn: "10s" }
  //   );
  //   const newRefreshToken = jwt.sign(
  //     { username: foundUser.username },
  //     process.env.REFRESH_SECRET,
  //     // TODO: Super short
  //     { expiresIn: "15s" }
  //   );
  //   //Saving refreshToken with current user
  //   foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
  //   const result = await foundUser.save();
  //   //Creates Secure Cookie with refresh token
  //   res.cookie("jwt", newRefreshToken, {
  //     httpOnly: true,
  //     secure: true,
  //     sameSite: "None",
  //     maxAge: 24 * 60 * 60 * 1000,
  //   });
  //   res.json({ accessToken });
  // });
};

module.exports = {
  handleLogin,
  login,
  register,
  logout,
  refreshToken,
};
