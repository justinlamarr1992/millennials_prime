const multer = require("multer");
var ffmpeg = require("fluent-ffmpeg");
const User = require("../models/userModel");
const { Video } = require("../models/VideoModel");

const createVideo = async (req, res) => {
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "../uploads/");
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
    //   This is for making sure they only upload MP4 Dont know if multer will accept of types
    fileFilter: (req, file, cb) => {
      console.log("In File Filter");
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
  let thumbsFilePath = "";
  let fileDuration = "";

  ffmpeg.ffprobe(req.body.filePath, function (err, metadata) {
    console.dir(metadata);
    console.log(metadata.format.duration);

    fileDuration = metadata.format.duration;
  });

  ffmpeg(req.body.filePath)
    .on("filenames", function (filenames) {
      console.log("Will generate " + filenames.join(", "));
      thumbsFilePath = "../uploads/thumbnails/" + filenames[0];
    })
    .on("end", function () {
      console.log("Screenshots taken");
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

const uploadVideo = async (req, res) => {
  const video = new Video(req.body);
  video.save((err, video) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
};

module.exports = { createVideo, createThumbnail, uploadVideo };
