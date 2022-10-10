const usersDb = {
  users: require("../models/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, password } = req.body;
  if (!user || !password)
    return res.status(400).json({ message: "Email and Password required" });

  // check for duplicates usernames in the db
  // const duplicate = await User.findOne({ username: user }).exec();
  const duplicate = await usersDb.users.find(
    (person) => person.username === user
  );
  if (duplicate) return res.sendStatus(409); //conflict

  try {
    //encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // //create and store the new user
    // const result = await User.create({
    //   username: user,
    //   password: hashedPassword,
    // });
    // console.log(result);
    // res.status(201).json({ success: `New user ${user} created` });

    // store the new user
    const newUser = {
      username: user,
      roles: { User: 2001 },
      password: hashedPassword,
    };
    usersDb.setUsers([...usersDb.users, newUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "models", "users.json"),
      JSON.stringify(usersDb.users)
    );
    console.log(usersDb.users);
    res.status(201).json({ success: `New User ${user} created` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
