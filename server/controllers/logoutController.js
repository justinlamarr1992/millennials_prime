// const User = require("../models/userModel");
// const User = require("../models/PrimeUser");
const User = require("../models/MillPrimeUser");

const handleLogout = async (req, res) => {
  // on Client, also delete the access Token in memeory of client application

  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  const refreshToken = cookies.jwt;

  //   is Refreshtoken in db
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204);
  }

  //   Delete refresh tokem in the db
  foundUser.refreshToken = "";
  const result = await foundUser.save();
  console.log(result);

  // Old No DB
  // const otherUsers = usersDb.users.filter(
  //   (person) => person.refreshToken !== foundUser.refreshToken
  // );
  // const currentUser = { ...foundUser, refreshToken: "" };
  // usersDb.setUsers([...otherUsers, currentUser]);
  // await fsPromises.writeFile(
  //   path.join(__dirname, "..", "models", "users.json"),
  //   JSON.stringify(usersDb.users)
  // );

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true }); //secure: true - only serves on https
  res.sendStatus(204);
};

module.exports = { handleLogout };
