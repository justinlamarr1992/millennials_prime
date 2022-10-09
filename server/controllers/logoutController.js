const usersDb = {
  users: require("../models/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
const fsPromises = require("fs").promises;
const path = require("path");
// const User = require("../models/userModel");

const handleLogout = async (req, res) => {
  // on Client, also delete the access Token in memeory of client application

  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(204); //No content
  const refreshToken = cookies.jwt;

  //   res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  //   is Refreshtoken in db
  const foundUser = usersDb.users.find(
    (person) => person.refreshToken === refreshToken
  );
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204);
  }

  //   Delete refresh tokem in the db
  const otherUsers = usersDb.users.filter(
    (person) => person.refreshToken !== foundUser.refreshToken
  );
  const currentUser = { ...foundUser, refreshToken: "" };
  usersDb.setUsers([...otherUsers, currentUser]);
  await fsPromises.writeFile(
    path.join(__dirname, "..", "models", "users.json"),
    JSON.stringify(usersDb.users)
  );
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true }); //secure: true - only serves on https
  res.sendStatus(204);
};
// const logout = async (req, res) => {
//   // on Client also delete accessToken

//   const cookies = req.cookies;
//   if (!cookies?.jwt) return res.sendStatus(204); //No content
//   const refreshToken = cookies.jwt;

//   // Is refreshtoken in db?
//   const foundUser = await User.findOne({ refreshToken }).exec();
//   if (!foundUser) {
//     res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
//     return res.sendStatus(204);
//   }

//   //   Delete refreshToken in db
//   foundUser.refreshToken = foundUser.refreshToken.filter(
//     (rt) => rt !== refreshToken
//   );
//   const result = await foundUser.save();
//   console.log(result);

//   res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
//   res.sendStatus(204);
// };

module.exports = { handleLogout };
