// const User = require("../models/PrimeUser");
const User = require("../models/MillPrimeUser");
const Image = require("../models/Image");
var mongoose = require("mongoose");

// const User = require("../models/user");

const getModalInfo = async (req, res) => {
  // if (!req?.params?.id)
  //   return res.status(400).json({ message: "User ID required" });

  // const _id = new mongoose.Types.ObjectId(req.params.id);

  const _id = new mongoose.Types.ObjectId(req.body._id);

  console.log(_id);

  // TODO: Get better ways to refine this

  try {
    // This is the code for who to follow that is doing good
    // So instead of just users find users with most activity of
    // some sort
    const follows = await User.find({
      _id: { $nin: [_id] },
    }).limit(3);
    // .toArray();
    // .toArray((err, users) => {
    //   if (!users || users.length === 0) {
    //     return res.status(200).json({
    //       success: false,
    //       message: "No Users Available",
    //     });
    //   }
    //   users.map((user) => {
    //     console.log(user);
    //   });
    // });

    // .find({})
    // .sort({ _id: -1 })
    // .limit(1)

    // if (!user) {
    //   return res
    //     .status(204)
    //     .json({ message: `No User matches ID ${req.params.id}` });
    // }
    // This is the code for who to connects that is doing good

    const connects = await User.find({
      _id: { $nin: [_id] },
    }).limit(3);

    res.status(200).json({ follows, connects });
  } catch (err) {
    console.log(err);
  }
};
const getUser = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "User ID required" });

  const _id = new mongoose.Types.ObjectId(req.params.id);
  console.log(_id);

  try {
    const user = await User.findOne({ _id }).exec();
    if (!user) {
      return res
        .status(204)
        .json({ message: `No User matches ID ${req.params.id}` });
    }
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
};
const getUserInfo = async (req, res) => {
  console.log("User Info from Post _id");
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
  const _id = new mongoose.Types.ObjectId(req.params);
  console.log(_id);
  const { name, email, DOB, country, state, city, zip } = req.body.values;
  let location = { country, state, city, zip };

  console.log(name, email, DOB, location);
  // This will be for the second one
  // console.log(DOB, location, businessOwner);
  if (!req?.params?.id)
    return res.status(400).json({ message: "User ID required" });
  const user = await User.findOneAndUpdate(
    { _id },
    {
      name,
      email,
      DOB,
      location,
    }
  ).exec();
  if (!user) {
    return res
      .status(204)
      .json({ message: `No User matches ID ${req.params.id}` });
  }
  res.json(user);
};
const updateBusinessInfo = async (req, res) => {
  const testMessage = "Yes it Fires";
  const _id = new mongoose.Types.ObjectId(req.params);
  console.log(_id);

  const {
    entrepreneur,
    companyName,
    industry,
    whyIndustry,
    openOnMillPrime,
    lengthOpen,
    whyBusiness,
    firstObjective,
    objectiveNow,
    howMany,
    productsAndServices,
    primaryPromotion,
    factorsOfLocation,
  } = req.body.values;

  let business = {
    // businessLogo,
    entrepreneur,
    companyName,
    industry,
    whyIndustry,
    openOnMillPrime,
    lengthOpen,
    whyBusiness,
    firstObjective,
    objectiveNow,
    howMany,
    productsAndServices,
    primaryPromotion,
    factorsOfLocation,
  };
  console.log(business);
  try {
    if (!req?.params?.id)
      return res.status(400).json({ message: "User ID required" });

    const user = await User.findByIdAndUpdate(
      { _id },
      {
        business: {
          // businessLogo,
          entrepreneur,
          companyName,
          industry,
          whyIndustry,
          openOnMillPrime,
          lengthOpen,
          whyBusiness,
          firstObjective,
          objectiveNow,
          howMany,
          productsAndServices,
          primaryPromotion,
          factorsOfLocation,
        },
      }
    );
    console.log(user);
    // Trying Insert next
    if (!user) {
      return res
        .status(204)
        .json({ message: `No User matches ID ${req.params.id}` });
    }
    res.status(200).json({ success: true, user, testMessage });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, err });
  }
};
const updateArtInfo = async (req, res) => {
  const testMessage = "Yes it Fires";
  const _id = new mongoose.Types.ObjectId(req.params);
  console.log(_id);

  const {
    artist,
    professional,
    purpose,
    affectIssues,
    navigateIndustry,
    inspirationOfWork,
    styleChanged,
    favsOrNoneFavs,
    network,
    support,
    critics,
    specificIntegral,
    whatSpecfic,
  } = req.body.values;

  let art = {
    artist,
    professional,
    purpose,
    affectIssues,
    navigateIndustry,
    inspirationOfWork,
    styleChanged,
    favsOrNoneFavs,
    network,
    support,
    critics,
    specificIntegral,
    whatSpecfic,
  };
  console.log(art);
  try {
    if (!req?.params?.id)
      return res.status(400).json({ message: "User ID required" });

    const user = await User.findByIdAndUpdate(
      { _id },
      {
        art: {
          artist,
          professional,
          purpose,
          affectIssues,
          navigateIndustry,
          inspirationOfWork,
          styleChanged,
          favsOrNoneFavs,
          network,
          support,
          critics,
          specificIntegral,
          whatSpecfic,
        },
      }
    );
    console.log(user);
    // Trying Insert next
    if (!user) {
      return res
        .status(204)
        .json({ message: `No User matches ID ${req.params.id}` });
    }
    res.status(200).json({ success: true, user, testMessage });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, err });
  }
};

const getPicture = async (req, res) => {
  // console.log("Decode Encode Practice");
  const _id = req.body._id;
  try {
    const user = await User.find({ _id });
    const image = user[0].profilePic;
    // console.log(image);

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
  getModalInfo,
  getUser,
  getUserInfo,
  getUserReq,
  updateUserInfo,
  updateBusinessInfo,
  updateArtInfo,
  getSingleUser,
  createProfilePicture,
  getPicture,
};
