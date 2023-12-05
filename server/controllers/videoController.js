const Subscriber = require("../models/Subscriber");

const Video = require("../models/VideoModel");
var mongoose = require("mongoose");

// Test from support

const sha256 = require("sha256");
// Test from support

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

function getBunnyInfo(req, res) {
  // THE PATH IS PROVIDED FROM BODY
  const body = req.body;
  console.log(body);

  let libraryId = 181057;
  // let libraryId = "147838";

  let api_key = "4c5ea068-0b40-40ae-8d9b2865c27c-f2d3-4fd9";
  // let authKey = "a80779d4-9931-4345-80c1ca2315d2-fc09-4143";

  const authorizationExpire = Math.floor(Date.now() / 1000) + 3600 * 48; // authorize for two days

  const video_id = body.videoID;
  console.log(video_id);

  let videoName = `Created in Backend: title:${body.title} ${new Date()}`;

  const shaAttempt = sha256(
    libraryId + api_key + authorizationExpire + video_id
  );

  try {
    console.log(shaAttempt);

    res.status(200).json({
      success: true,
      shaAttempt,
      authorizationExpire,
      video_id,
      libraryId,
    });
  } catch (err) {
    console.log("THE TRY DIDNT WORK");
    console.log("err", err);
    res.status(500).json({ success: false, message: err.message });
  }
}

module.exports = {
  getBunnyInfo,
  getVideos,
  getSingleVideo,
  getPrimeNewsVideo,
  getSubscriptionVideos,
};
