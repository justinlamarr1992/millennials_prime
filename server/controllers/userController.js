const User = require("../models/MillPrimeUser");
// const User = require("../models/user");

const getAllUsers = async (req, res) => {
  const users = await User.find();
  if (!users) return res.status(204).json({ message: "No users found" });
  res.json(users);
};

const deleteUser = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "User ID required" });

  const user = await User.findOne({ _id: req.body.id }).exec();
  if (!user) {
    return res
      .status(204)
      .json({ message: `No User matches ID ${req.body.id}` });
  }
  const result = await user.deleteOne({ _id: req.body.id });
  res.json(result);
};

const getUser = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "User ID required" });
  const user = await User.findOne({ _id: req.params.id }).exec();
  if (!user) {
    return res
      .status(204)
      .json({ message: `No User matches ID ${req.params.id}` });
  }
  res.json(user);
};

const updateUserInfo = async (req, res) => {
  const { DOB, location, businessOwner } = req.body;
  if (!req?.params?.id)
    return res.status(400).json({ message: "User ID required" });
  const user = await User.findOneAndUpdate({
    _id: req.params.id,
    DOB,
    location,
    businessOwner,
  }).exec();
  if (!user) {
    return res
      .status(204)
      .json({ message: `No User matches ID ${req.params.id}` });
  }
  res.json(user);
};

module.exports = {
  getAllUsers,
  deleteUser,
  getUser,
  updateUserInfo,
};
