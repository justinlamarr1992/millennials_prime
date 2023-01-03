// const User = require("../models/PrimeUser");
const User = require("../models/MillPrimeUser");
const Image = require("../models/Image");
var mongoose = require("mongoose");

// const User = require("../models/user");

const getUser = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "User ID required" });

  const _id = mongoose.Types.ObjectId(req.body._id);

  const user = await User.findOne({ _id }).exec();
  if (!user) {
    return res
      .status(204)
      .json({ message: `No User matches ID ${req.params.id}` });
  }
  res.json(user);
};
const getUser2 = async (req, res) => {
  console.log("Decode Encode Practice");
  const _id = req.body._id;
  try {
    const user = await User.find({ _id });

    res.json(user);
  } catch (err) {
    res.status(408).json({ err });
  }
};

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

const getUserReq = async (req, res) => {
  console.log(req.body.userTo);
  console.log(req.body.userFrom);

  if (!req?.body?.userTo || !req?.body?.userFrom)
    return res.status(400).json({ message: "User ID required" });

  try {
    const userTo = await User.findOne({ _id: req.body.userTo }).exec();
    if (!userTo) {
      return res
        .status(204)
        .json({ message: `No User matches ID ${req.body.userTo}` });
    }
    const userFrom = await User.findOne({ _id: req.body.userFrom }).exec();
    if (!userFrom) {
      return res
        .status(204)
        .json({ message: `No User matches ID ${req.body.userFrom}` });
    }
    res.status({ success: true, userFrom });
  } catch (err) {
    console.log(err);
  }
};

const getSingleUser = async (req, res) => {};

const updateUserInfo = async (req, res) => {
  const { DOB, location, businessOwner } = req.body;
  console.log(DOB, location, businessOwner);
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

const getPicture = async (req, res) => {
  console.log("Decode Encode Practice");
  const _id = req.body._id;
  try {
    const user = await User.find({ _id });
    const image = user[0].profilePic;
    console.log(image);

    try {
      const getImage = await Image.find({ _id: image });
      const getImageToClient = getImage[0].image;
      res.status(200).json({ success: true, getImageToClient });
    } catch (err) {
      console.log(err);
      res.status(408).json({ err });
    }
  } catch (err) {
    res.status(408).json({ err });
  }
};

const createProfilePicture = async (req, res) => {
  const _id = mongoose.Types.ObjectId(req.body._id);

  const image = String(req.body.newImage.image);

  try {
    const picture = await Image.create({ image, userID: _id });
    const user = await User.findByIdAndUpdate(_id, { profilePic: picture });
    res.status(200).json({ success: true, picture, user });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ success: false, err });
  }
};

module.exports = {
  getAllUsers,
  deleteUser,
  getUser,
  getUser2,
  getUserReq,
  updateUserInfo,
  getSingleUser,
  createProfilePicture,
  getPicture,
};
