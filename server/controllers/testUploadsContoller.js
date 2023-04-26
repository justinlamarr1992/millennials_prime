const express = require("express");
var app = express();
var ffmpeg = require("fluent-ffmpeg");
const multer = require("multer");
const concat = require("stream-concat");
var fs = require("fs");
const { MongoClient, ObjectId, GridFSBucket } = require("mongodb");
var mime = require("mime");
// const User = require("../models/PrimeUser");
// const User = require("../models/MillPrimeUser");

const Video = require("../models/VideoModel");
var mongoose = require("mongoose");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer();
// const upload = multer({ storage: storage });

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

client.connect((err) => {
  const db = client.db("test");
  const bucket = new GridFSBucket(db, { bucketName: "videos" });
});

// ORIGINAL BUCKET

const connect = mongoose.createConnection(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// TODO: When done testing this needs to be un remarked
// THIS IS THE BUCKET!!!
let gfs;
connect.once("open", () => {
  gfs = new mongoose.mongo.GridFSBucket(connect.db, {
    bucketName: "videos",
  });
});

const uploadVideo = async (req, res) => {
  console.log(req.body);
  // try {
  //   client.connect((err) => {
  //     const db = client.db("test");
  //     const bucket = new GridFSBucket(db, { bucketName: "videos" });
  //   });
  //   upload.single("file"),
  //     (req, res) => {
  //       const { title, description } = req.body;
  //       const videoStream = req.file.stream;
  //       const uploadStream = bucket.openUploadStream(req.file.originalname);

  //       uploadStream.once("finish", () => {
  //         res.json({ message: "Video uploaded successfully" });
  //       });

  //       videoStream.pipe(uploadStream);
  //     };
  //   res.status(200).json({ success: true });
  // } catch (err) {
  //   console.log(err);
  //   res.status(400).json({ success: false, err });
  // }
};
// const uploadVideo = async (req, res) => {
//   try {
//     client.connect((err) => {
//       const db = client.db("test");
//       const bucket = new GridFSBucket(db, { bucketName: "videos" });
//     });
//     upload.single("file"),
//       (req, res) => {
//         const { title, description } = req.body;
//         const videoStream = req.file.stream;
//         const uploadStream = bucket.openUploadStream(req.file.originalname);

//         uploadStream.once("finish", () => {
//           res.json({ message: "Video uploaded successfully" });
//         });

//         videoStream.pipe(uploadStream);
//       };
//     res.status(200).json({ success: true });
//   } catch (err) {
//     console.log(err);
//     res.status(400).json({ success: false, err });
//   }
// };

// const uploadVideo = async (req, res) => {
//   upload.single("file");
//   console.log("Req.body", req.body);

//   // // TESTING

//   // client.connect((err) => {
//   // const db = gfs.db("test");
//   // const bucket = new GridFSBucket(db, { bucketName: "videos" });
//   // app.post("/", upload.single("video"), (req, res) => {
//   console.log("We also are here");
//   console.log(req.body.file.path);
//   const videoStream = fs.createReadStream(req.body.file.path);
//   // const videoStream = fs.createReadStream(req.file.path);
//   const uploadStream = gfs.openUploadStream(req.body.file.path);
//   // const uploadStream = bucket.openUploadStream(req.file.originalname);
//   videoStream
//     .pipe(uploadStream)
//     .on("error", (error) => {
//       console.log(`Error uploading video: ${error}`);
//       res.status(500).send("Error uploading video");
//     })
//     .on("finish", () => {
//       console.log("Video uploaded successfully");
//       res.send("Video uploaded successfully");
//     });
//   console.log("Its makes it here");
//   // });
//   // });
//   // // TESTING

//   console.log("The end of testing");
// };

// const uploadVideo = async (req, res) => {
//   console.log(req.body);
//   const videoStream = fs.createReadStream(req.file.path);
//   const uploadStream = bucket.openUploadStream(req.file.originalname);

//   videoStream
//     .pipe(uploadStream)
//     .on("error", (error) => {
//       console.log(`Error uploading video: ${error}`);
//       res.status(500).send("Error uploading video");
//     })
//     .on("finish", () => {
//       console.log("Video uploaded successfully");
//       res.send("Video uploaded successfully");
//     });
//   //   // var file = gfs.find({ _id: req.body.title });
//   //   // file.count().then((count) => {
//   //   //   console.log(count);
//   //   //   if (count === 1) {
//   //   //     gfs.delete(req.params.id, (err) => {
//   //   //       if (!err) {
//   //   //         file.destroy();
//   //   //         var uploadStream = gfs.openUploadStreamWithId(
//   //   //           req.params.id,
//   //   //           req.params.id,
//   //   //           { contentType: contentType }
//   //   //         );
//   //   //         var content = req.body.script;
//   //   //         var s = new Readable();
//   //   //         s.push(content);
//   //   //         s.push(null);
//   //   //         s.pipe(uploadStream);
//   //   //         uploadStream.on("finish", () => {
//   //   //           res.status(200);
//   //   //           res.send("saved " + req.params.id);
//   //   //         });
//   //   //       } else {
//   //   //         var uploadStream = bucket.openUploadStreamWithId(
//   //   //           req.params.id,
//   //   //           req.params.id,
//   //   //           { contentType: contentType }
//   //   //         );
//   //   //         var content = req.body.script;
//   //   //         var s = new Readable();
//   //   //         s.push(content);
//   //   //         s.push(null);
//   //   //         s.pipe(uploadStream);
//   //   //         uploadStream.on("finish", () => {
//   //   //           res.status(200);
//   //   //           res.send("saved " + req.params.id);
//   //   //         });
//   //   //         // uploadStream.on('finish', function () {
//   //   //         // 	console.log('uploaded ' + fname + ' @ ', bucketName);
//   //   //         // 	//process.exit();
//   //   //         // 	readStream.close();
//   //   //         // });
//   //   //         // readStream.pipe(uploadStream);
//   //   //       }
//   //   //     });
//   //   //   }
//   //   // });
//   console.log("And we are here");
// };

const uploadVideoInfo = async (req, res, next) => {
  gfs
    .find({})
    .sort({ _id: -1 })
    .limit(1)
    .toArray((err, files) => {
      if (!files || files.length === 0) {
        return res.status(200).json({
          success: false,
          message: "No files available",
        });
      }
      files.map((file) => {
        console.log(file);
        const changeId = file._id;
        // gfs.put({ _id: changeId }, { filename: "TEst" });
        // if (
        //   file.contentType === "image/jpeg" ||
        //   file.contentType === "image/png" ||
        //   file.contentType === "image/svg"
        // ) {
        //   file.isImage = true;
        // } else {
        //   file.isImage = false;
        // }
      });

      res.status(200).json({
        success: true,
        files,
      });
    });
  // const testFind = gfs.find({}).sort({ _id: -1 }).limit(1);
  const testFind = gfs.find({ _id: new ObjectId("6423661daf0c4779b4709c9c") });
  // console.log("THIS IS WHAT WE FOUND IN TEST FIND", testFind);

  // res
  //   .status(200)
  //   .json({ success: true, message: "Info was pasted", info: req.body });
};

const downloadVideo = async (req, res) => {};
const deleteVideo = async (req, res) => {
  const fileId = new ObjectId("63d40176741612651ed5f84c");

  const file = await gfs.find({ _id: fileId }).toArray();
  console.log(file);
  await gfs.delete({ _id: fileId });
};
const getVideo = async (req, res) => {
  // This gets the latest Video Submit
  // Todo: Maker it to where its from MillPrime and associates Profile only
  try {
    const chunks = gfs.find({
      files_id: new Object("6425fcf1e6f823ecea5c5587"),
    });

    // This finds the Lastest video inside the Collection THIS IS GOOD
    // const findLatest = gfs;
    // .find({}, { sort: { uploadDate: -1 }, limit: 1 })
    // .toArray((err, files) => {
    //   if (!files[0] || files.length === 0) {
    //     return res.status(200).json({
    //       success: false,
    //       message: "No files available",
    //     });
    //   }
    //   console.log("File._id ", files[0]._id);
    //   const files_id = files[0]._id;

    //   const chunks = gfs.find({ files_id: files_id });

    //   const transformStream = transform(function(chunk, callback) {
    //   const chunksData = [];
    //   const command = ffmpeg();
    //   chunksData.push(chunks);

    //     callback(null, chunk);
    //   });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, err });
  }
};
const getVideos = async (req, res) => {
  try {
    const testFind = gfs.find({}).toArray((err, files) => {
      if (!files[0] || files.length === 0) {
        return res.status(200).json({
          success: false,
          message: "No files available",
        });
      }
      res.status(200).json({
        success: true,
        files,
      });
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, err });
  }
};

module.exports = {
  uploadVideo,
  uploadVideoInfo,
  downloadVideo,
  getVideo,
  getVideos,
  deleteVideo,
};
