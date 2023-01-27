const express = require("express");
const multer = require("multer");
var ffmpeg = require("fluent-ffmpeg");
// const User = require("../models/PrimeUser");
// const User = require("../models/MillPrimeUser");

const Video = require("../models/VideoModel");
var mongoose = require("mongoose");

const upload = require("../middleware/gridFS");
const {
  engine,
  updateMetadata,
  // , gfs
} = upload;

const url = process.env.MONGO_URI;
const connect = mongoose.createConnection(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let gfs;
connect.once("open", () => {
  gfs = new mongoose.mongo.GridFSBucket(connect.db, {
    bucketName: "videos",
  });
});

const uploadVideoInfo = async (req, res, next) => {
  console.log("Im here now");

  console.log(gfs);
  // const test = await gfs.findOne({}, {}, { sort: { _id: -1 } });
  // console.log(test);

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
        if (
          file.contentType === "image/jpeg" ||
          file.contentType === "image/png" ||
          file.contentType === "image/svg"
        ) {
          file.isImage = true;
        } else {
          file.isImage = false;
        }
      });

      res.status(200).json({
        success: true,
        files,
      });
    });

  // TODO: i am here now all i have to do is add the info from the req.body in to the metadata by changing it some way

  // THIS FINDS ALL FILES!!!!
  // gfs.find({}, {}, { sort: { _id: "-1" } }).toArray((err, files) => {
  //   if (!files || files.length === 0) {
  //     return res.status(200).json({
  //       success: false,
  //       message: "No files available",
  //     });
  //   }
  //   files.map((file) => {
  //     if (
  //       file.contentType === "image/jpeg" ||
  //       file.contentType === "image/png" ||
  //       file.contentType === "image/svg"
  //     ) {
  //       file.isImage = true;
  //     } else {
  //       file.isImage = false;
  //     }
  //   });

  //   res.status(200).json({
  //     success: true,
  //     files,
  //   });
  // });

  // gfs.find().toArray((err, files) => {
  //   if (!files || files.length === 0) {
  //     return res.status(200).json({
  //       success: false,
  //       message: "No files available",
  //     });
  //   } else {
  //     console.log(files.length);
  //   }

  // files.map((file) => {
  //   if (
  //     file.contentType === "image/jpeg" ||
  //     file.contentType === "image/png" ||
  //     file.contentType === "image/svg"
  //   ) {
  //     file.isImage = true;
  //   } else {
  //     file.isImage = false;
  //     console.log("It aint a Picture DAWG");
  //   }
  // });

  //   res.status(200).json({
  //     success: true,
  //     files,
  //   });
  // });

  console.log("Do I make it here?");

  // res
  //   .status(200)
  //   .json({ success: true, message: "Info was pasted", info: req.body });
};

const downloadVideo = async (req, res) => {};
// router.route("/").post(upload.single("file"), (req, res, next) => {});

// router.route("/files").get((req, res, next) => {
//   gfs.find().toArray((err, files) => {
//     if (!files || files.length === 0) {
//       return res.status(200).json({
//         success: false,
//         message: "No Files Available",
//         Number: files.length,
//       });
//     }
//     res.status(200).json({
//       success: true,
//       files,
//     });
//   });
// });

// router.route("/file/:filename").get((req, res, next) => {
//   console.log(req.params.filename);
//   console.log("TESTING HERE");
//   gfs.find({ filename: req.params.filename }).toArray((err, files) => {
//     if (!files[0] || files.length === 0) {
//       return res
//         .status(200)
//         .json({ success: false, message: "No Files Available" });
//     }
//     res.status(200).json({
//       success: true,
//       file: files[0],
//     });
//   });
// });

// router.route("/file/del/:id").get((req, res, next) => {
//   console.log(req.params.id);
//   gfs.delete(new mongoose.Types.ObjectId(req.params.id), (err, data) => {
//     if (err) {
//       return res.status(404).json({ err: err });
//     }
//     res.status(200).json({
//       success: true,
//       message: `File with ID ${req.params.id} is deleted`,
//     });
//   });
// });

// router.route("/recent").get((req, res, next) => {
//   Video.findOne({}, {}, { sort: { _id: -1 } })
//     .then((video) => {
//       res.status(200).json({ success: true, video });
//     })
//     .catch((err) => res.status(500).json(err));
// });

// //    GET: Fetches a particular image and render on browser
// router.route("/primeVid/:filename").get((req, res, next) => {
//   gfs.find({ filename: req.params.filename }).toArray((err, files) => {
//     if (!files[0] || files.length === 0) {
//       return res.status(200).json({
//         success: false,
//         message: "No files available",
//       });
//     }
//     if (files[0].contentType === "video/quicktime") {
//       gfs.openDownloadStreamByName(req.params.filename).pipe(res);
//     } else {
//       res.status(404).json({ err: "Not a Video" });
//     }
//   });
// });

// router.route("/primeVid").post((req, res) => {
//   //Accepting user input directly is very insecure and should
//   //never be allowed in a production app.
//   //Sanitize the input before accepting it
//   //This is for demonstration purposes only

//   let fileName = req.body.text1;

//   //Connect to the MongoDB client

//   MongoClient.connect(url, function (err, client) {
//     if (err) {
//       return res.render("index", {
//         title: "Uploaded Error",
//         message: "MongoClient Connection error",
//         error: err.errMsg,
//       });
//     }
//     const db = client.db(dbName);
//     const collection = db.collection("test.files");
//     const collectionChunks = db.collection("test.chunks");
//     collection.find({ filename: fileName }).toArray(function (err, docs) {
//       if (err) {
//         return res.render("index", {
//           title: "File error",
//           message: "Error finding file",
//           error: err.errMsg,
//         });
//       }
//       if (!docs || docs.length === 0) {
//         return res.render("index", {
//           title: "Download Error",
//           message: "No file found",
//         });
//       } else {
//         //Retrieving the chunks from the db
//         collectionChunks
//           .find({ files_id: docs[0]._id })
//           .sort({ n: 1 })
//           .toArray(function (err, chunks) {
//             if (err) {
//               return res.render("index", {
//                 title: "Download Error",
//                 message: "Error retrieving chunks",
//                 error: err.errmsg,
//               });
//             }
//             if (!chunks || chunks.length === 0) {
//               //No data found
//               return res.render("index", {
//                 title: "Download Error",
//                 message: "No data found",
//               });
//             }

//             let fileData = [];
//             for (let i = 0; i < chunks.length; i++) {
//               //This is in Binary JSON or BSON format, which is stored
//               //in fileData array in base64 endocoded string format

//               fileData.push(chunks[i].data.toString("base64"));
//             }

//             //Display the chunks using the data URI format
//             let finalFile =
//               "data:" + docs[0].contentType + ";base64," + fileData.join("");
//             res.render("imageView", {
//               title: "Image File",
//               message: "Image loaded from MongoDB GridFS",
//               imgurl: finalFile,
//             });
//           });
//       }
//     });
//   });
// });

// router.route("/").get(testUploadsController.downloadVideo);

module.exports = {
  uploadVideoInfo,
  downloadVideo,
};
