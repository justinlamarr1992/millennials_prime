const Subscriber = require("../models/Subscriber");

const Video = require("../models/VideoModel");
var mongoose = require("mongoose");

const getVideos = async (req, res) => {
  const videos = await Video.find().sort({ createdAt: -1 });
  if (!videos) return res.status(204).json({ message: `No Videos ` });
  res.status(200).json({ success: true, videos });
};

const getSubscriptionVideos = async (req, res) => {
  console.log("IT CORRECTELY HIT HERE");

  // const userFromTest = mongoose.Types.ObjectId(req.body.userFrom);
  // console.log("Test User ObjectId", userFromTest);

  // const userFrom = req.body.userFrom;
  // console.log(userFrom);
  const userFrom = mongoose.Types.ObjectId(req.body.userFrom);
  console.log(userFrom);

  // Need to find all of the users that i am subscribing from scribiption collectiom

  const subscriptions = await Subscriber.find({ userFrom }).exec();
  console.log("SUBSCRIPTIONS CONSOLE LOG", subscriptions);

  if (!subscriptions)
    return res
      .status(204)
      .json({ message: "The User is not subscribed to Any Users" });

  try {
    let subscribedUsers = [];
    // console.log("SUBSCRIBED USERS CONSOLE LOG", subscribedUsers);

    subscriptions.map((subscriber, i) => {
      console.log(`This is ${i} subscriber that will be pushed ${subscriber}`);
      subscribedUsers.push(subscriber.userTo);
    });

    // Need to fecth all the videos that belong to the users that i found in previous step

    const videos = await Video.find({ userPosting: { $in: subscribedUsers } })
      .populate("userPosting")
      .exec();
    try {
      res.status(200).json({ success: true, videos });
    } catch (err) {
      return res.status(400).send(err);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

  // TODO: Change the subcribe plain user ID to entire Object ID
  //THE PROBLEM IS THE DIFFERENC BETWEEN AHNS USERS AND GRAYS USER
  //SO NOW I MUST FIGURE A WAYD TO GET _ID then get the millprime user then subscribe that entire
  //Object Not just the _id

  // TEST .OBJECTID

  // const userFromTest = mongoose.Types.ObjectId(req.body.userFrom);
  // console.log(userFromTest);

  // // Subscriber.find({ userFrom: req.body.userFrom }).exec((err, subscribers) => {
  // Subscriber.find({ userFrom: userFromTest }).exec((err, subscribers) => {
  //   if (err) return res.status(400).send(err);

  //   let subscribedUser = [];

  //   subscribers.map((subscriber, i) => {
  //     subscribedUser.push(subscriber.userTo);
  //   });
  //   console.log(subscribedUser);

  //   Video.find({ userPosting: { $in: [subscribedUser] } }).exec(
  //     // Video.find({ userPosting: "63443462575cbf86c3b630f4" }).exec(
  //     (err, videos) => {
  //       if (err) return res.status(400).send(err);
  //       res.status(200).json({ success: true, videos });
  //       console.log(videos);
  //     }
  //   );
  // });

  console.log("AND HERE");
};

const getSingleVideo = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({ message: "Video ID required" });
  }
  const _id = mongoose.Types.ObjectId(req.params.id);

  const video = await Video.findOne({ _id }).exec();
  if (!video) {
    return res
      .status(204)
      .json({ message: `No Video matches ID ${req.params.id}` });
  }
  res.status(200).json({ success: true, video });
  try {
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getPrimeNewsVideo = async (req, res) => {
  console.log("It ran in the backend");
  let getVideoToClient;

  try {
    const video = await Video.find().sort({ _id: -1 }).limit(1);
    console.log(video);
    try {
      getVideoToClient = video.video;
    } catch (err) {}

    res.status(200).json({ success: true, video, getVideoToClient });
  } catch (err) {
    console.log("err");
    res.status(500).json({ success: false, message: err.message });
  }
};

const getBunnyInfo = async (req, res) => {
  console.log("Back to the back end");
};

module.exports = {
  getBunnyInfo,
  getVideos,
  getSingleVideo,
  getPrimeNewsVideo,
  getSubscriptionVideos,
};
