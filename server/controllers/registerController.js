const User = require("../models/MillPrimeUser");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  console.log(req.body);
  const { user, password, firstName, lastName, DOB } = req.body;
  const name = firstName + " " + lastName;
  const email = user.split("@")[0];
  // const username = user.split("@")[0];
  if (!user || !password)
    return res.status(400).json({ message: "Email and Password required" });
  if (!DOB)
    return res.status(400).json({ message: "Please enter a Date of Birth" });

  // check for duplicates usernames in the db
  const duplicate = await User.findOne({ username: user }).exec();

  if (duplicate) return res.sendStatus(409); //conflict

  try {
    //encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // //create and store the new user
    const result = await User.create({
      username: user,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      name,
      DOB,
    });
    // console.log(result);
    res.status(201).json({ success: `New User ${user} created` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
