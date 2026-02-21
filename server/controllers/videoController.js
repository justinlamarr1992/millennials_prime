const Subscriber = require("../models/Subscriber");
const User = require("../models/MillPrimeUser");
const Video = require("../models/VideoModel");
var mongoose = require("mongoose");

const sha256 = require("sha256");

const getVideos = async (req, res) => {
  const videos = await Video.find().sort({ createdAt: -1 });
  if (!videos) return res.status(204).json({ message: `No Videos ` });
  res.status(200).json({ success: true, videos });
};

const getSubscriptionVideos = async (req, res) => {
  const userFrom = mongoose.Types.ObjectId(req.body.userFrom);

  const subscriptions = await Subscriber.find({ userFrom }).exec();

  if (!subscriptions)
    return res
      .status(204)
      .json({ message: "The User is not subscribed to Any Users" });

  try {
    let subscribedUsers = [];

    subscriptions.map((subscriber) => {
      subscribedUsers.push(subscriber.userTo);
    });

    const videos = await Video.find({ userPosting: { $in: subscribedUsers } })
      .populate("userPosting")
      .exec();
    res.status(200).json({ success: true, videos });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
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
};

const getPrimeNewsVideo = async (req, res) => {
  try {
    const video = await Video.find().sort({ _id: -1 }).limit(1);
    res.status(200).json({ success: true, video });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

async function getBunnyInfo(req, res) {
  const body = req.body;

  const libraryId = process.env.BUNNYCDN_LIBRARY_ID;
  const api_key = process.env.BUNNYCDN_API_KEY;

  if (!libraryId || !api_key) {
    return res.status(503).json({ success: false, message: "BunnyCDN not configured" });
  }

  const video_id = body.videoID;
  if (!video_id) {
    return res.status(400).json({ success: false, message: "videoID is required" });
  }

  try {
    const user = await User.findOne({ username: req.user });
    if (!user || !user.prime) {
      return res.status(403).json({ success: false, message: "Content creators only" });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }

  const authorizationExpire = Math.floor(Date.now() / 1000) + 3600 * 48; // authorize for two days

  const shaAttempt = sha256(
    libraryId + api_key + authorizationExpire + video_id
  );

  res.status(200).json({
    success: true,
    shaAttempt,
    authorizationExpire,
    video_id,
    libraryId,
  });
}

const saveVideo = async (req, res) => {
  const { videoId, title, description, category, audience } = req.body;

  if (!videoId) {
    return res.status(400).json({ success: false, message: "videoId is required" });
  }

  try {
    const video = await Video.create({
      video: videoId,
      userPosting: req.userId,
      title,
      description,
      category,
      prime: audience,
    });
    res.status(201).json({ success: true, videoId: video.video });
  } catch (err) {
    if (err.name === "ValidationError" || err.name === "CastError") {
      return res.status(400).json({ success: false, message: err.message });
    }
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getBunnyInfo,
  getVideos,
  getSingleVideo,
  getPrimeNewsVideo,
  getSubscriptionVideos,
  saveVideo,
};
