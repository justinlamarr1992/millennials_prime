// const UserTest = require("../models/User");
const User = require("../models/PrimeUser");

const bcrypt = require("bcrypt");
// const usersDb = {
//   users: require("../models/users.json"),
//   setUsers: function (data) {
//     this.users = data;
//   },
// };
// const path = require("path");
// const fsPromises = require("fs").promises;

const handleNewUser = async (req, res) => {
  const { user, password, firstName, lastName } = req.body;
  if (!user || !password)
    return res.status(400).json({ message: "Email and Password required" });

  // check for duplicates usernames in the db
  const duplicate = await User.findOne({ username: user }).exec();

  if (duplicate) return res.sendStatus(409); //conflict

  try {
    //encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // //create and store the new user
    const result = await User.create({
      username: user,
      password: hashedPassword,
      firstName,
      lastName,
    });
    console.log(result);
    res.status(201).json({ success: `New User ${user} created` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
