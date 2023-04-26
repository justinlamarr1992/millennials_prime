const express = require("express");
const multer = require("multer");
var ffmpeg = require("fluent-ffmpeg");
// const User = require("../models/PrimeUser");
// const User = require("../models/MillPrimeUser");
const Subscriber = require("../models/Subscriber");

const Video = require("../models/VideoModel");
var mongoose = require("mongoose");
// const { GridFsStorage } = require("multer-gridfs-storage");

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

const createVideo = (req, res) => {
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "../uploads/");
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
    //   This is for making sure they only upload MP4 Dont know if multer will accept of types
    fileFilter: (req, file, cb) => {
      // console.log("In File Filter");
      const ext = path.extname(file.originalname);
      // May have to use this in the pictures section later
      if (ext !== ".mp4") {
        return cb(res.status(400).end("only MP4 files are allowed"), false);
      }
      cb(null, true);
    },
  });
  var upload = multer({ storage: storage }).single("file");
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
};

const createThumbnail = async (req, res) => {
  // console.log("I RAN HAHAHAH");
  let thumbsFilePath = "";
  let fileDuration = "";
  ffmpeg.ffprobe(req.body.filePath, function (err, metadata) {
    // console.log(metadata.format.duration);
    fileDuration = metadata.format.duration;
  });
  ffmpeg(req.body.filePath)
    .on("filenames", function (filenames) {
      // console.log("Will generate " + filenames.join(", "));
      thumbsFilePath = "../uploads/thumbnails/" + filenames[0];
    })
    .on("end", function () {
      // console.log("Screenshots taken");
      return res.json({
        success: true,
        thumbsFilePath: thumbsFilePath,
        fileDuration: fileDuration,
      });
    })
    .screenshots({
      // Will take screens at 20%, 40%, 60% and 80% of the video
      count: 3,
      folder: "../uploads/thumbnails",
      size: "320x240",
      //   %b input basename (filename without extension)
      filename: "thumbnail-%b.png",
    });
};

const createNewVideo = async (req, res) => {
  console.log(req.body.formData);
  // TODO: FINDO OUT WHY NOTHINGS BEING SENT
  res.status(200).json({ message: "Test 1 pass" });
  // const _id = mongoose.Types.ObjectId(req.body._id);

  // const videoFile = String(req.body.base64);
  // console.log(_id, videoFile);

  // try {
  //   const video = await Video.create({ video: videoFile, userPosting: _id });
  //   //  TODO: Change User so the user has video and video _id in its database
  //   //  const user = await User.findByIdAndUpdate(_id, { profilePic: picture });
  //   //  res.status(200).json({ success: true, picture, user });
  //   res.status(200).json({ success: true, video });
  // } catch (err) {
  //   console.log(err);
  //   return res.status(400).json({ success: false, err });
  // }
};

// const uploadVideo = async (req, res) => {
//   // TODO: Work on only send needed info for save
//   // console.log(req.body);

//   const test = req.body;

//   const storage = new GridFsStorage({
//     url: process.env.MONGO_URI,
//     test: (req, test) => {
//       return new Promise((resolve, reject) => {
//         const title = test.title;
//         const fileInfo = {
//           filename: test,
//           bucketName: "uploads",
//         };
//         resolve(fileInfo);
//       });
//     },
//   });
//   // const video = await Video.create(req.body);
//   // try {
//   //   video.save();
//   //   return res.status(200).json({ success: true });
//   // } catch (err) {
//   //   return res.status(400).json({ success: false, err });
//   // }

//   // console.log(storage);

//   try {
//     const letsSee = multer({ storage });
//     return res.status(200).json({ letsSee, success: true });
//   } catch (err) {
//     console.log(err);
//     return res.status(400).json({ success: false, err });
//   }
// };

module.exports = {
  createVideo,
  createNewVideo,
  createThumbnail,
  // uploadVideo,
  getVideos,
  getSingleVideo,
  getPrimeNewsVideo,
  getSubscriptionVideos,
};
