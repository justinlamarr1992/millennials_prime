const express = require("express");
const multer = require("multer");
var ffmpeg = require("fluent-ffmpeg");
const Grid = require("gridfs-stream");
const { MongoClient, ObjectId, GridFSBucket } = require("mongodb");
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

// TODO: When done testing this needs to be un remarked
let gfs;
connect.once("open", () => {
  gfs = new mongoose.mongo.GridFSBucket(connect.db, {
    bucketName: "videos",
  });
});

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
  console.log("backend");
  //Accepting user input directly is very insecure and should
  //never be allowed in a production app.
  //Sanitize the input before accepting it
  //This is for demonstration purposes only

  let fileName = "bf64b7d37b8e89d53117173e6b8b79fc.mov";

  //Connect to the MongoDB client

  // MongoClient.connect(url, function (err, client) {
  //   if (err) {
  //     console.log("First Error");
  //     return res.status(400).json({
  //       success: false,
  //       title: "Uploaded Error",
  //       message: "MongoClient Connection error",
  //       error: err.errMsg,
  //     });
  //   }
  //   console.log("NO first Error");
  //   const db = client.db("millennialsprime");
  //   const collection = db.collection("videos.files");
  //   const collectionChunks = db.collection("videos.chunks");
  //   collection.find({ filename: fileName }).toArray(function (err, docs) {
  //     if (err) {
  //       return res.render("index", {
  //         title: "File error",
  //         message: "Error finding file",
  //         error: err.errMsg,
  //       });
  //     }
  //     if (!docs || docs.length === 0) {
  //       return res.render("index", {
  //         title: "Download Error",
  //         message: "No file found",
  //       });
  //     } else {
  //       //Retrieving the chunks from the db
  //       collectionChunks
  //         .find({ files_id: docs[0]._id })
  //         .sort({ n: 1 })
  //         .toArray(function (err, chunks) {
  //           if (err) {
  //             return res.render("index", {
  //               title: "Download Error",
  //               message: "Error retrieving chunks",
  //               error: err.errmsg,
  //             });
  //           }
  //           if (!chunks || chunks.length === 0) {
  //             //No data found
  //             return res.render("index", {
  //               title: "Download Error",
  //               message: "No data found",
  //             });
  //           }

  //           let fileData = [];
  //           for (let i = 0; i < chunks.length; i++) {
  //             //This is in Binary JSON or BSON format, which is stored
  //             //in fileData array in base64 endocoded string format

  //             fileData.push(chunks[i].data.toString("base64"));
  //           }

  //           //Display the chunks using the data URI format
  //           let finalFile =
  //             "data:" + docs[0].contentType + ";base64," + fileData.join("");
  //           res.render("imageView", {
  //             title: "Image File",
  //             message: "Image loaded from MongoDB GridFS",
  //             imgurl: finalFile,
  //           });
  //         });
  //     }
  //   });
  // });
  console.log("It reaches the bottom");
};
const getVideos = async (req, res) => {
  //Accepting user input directly is very insecure and should
  //never be allowed in a production app.
  //Sanitize the input before accepting it
  //This is for demonstration purposes only

  let fileName = "bf64b7d37b8e89d53117173e6b8b79fc.mov";

  //Connect to the MongoDB client

  // MongoClient.connect(url, function (err, client) {
  //   if (err) {
  //     console.log("First Error");
  //     return res.status(400).json({
  //       success: false,
  //       title: "Uploaded Error",
  //       message: "MongoClient Connection error",
  //       error: err.errMsg,
  //     });
  //   }
  //   console.log("NO first Error");
  //   const db = client.db("millennialsprime");
  //   const collection = db.collection("videos.files");
  //   const collectionChunks = db.collection("videos.chunks");
  //   collection.find({ filename: fileName }).toArray(function (err, docs) {
  //     if (err) {
  //       return res.render("index", {
  //         title: "File error",
  //         message: "Error finding file",
  //         error: err.errMsg,
  //       });
  //     }
  //     if (!docs || docs.length === 0) {
  //       return res.render("index", {
  //         title: "Download Error",
  //         message: "No file found",
  //       });
  //     } else {
  //       //Retrieving the chunks from the db
  //       collectionChunks
  //         .find({ files_id: docs[0]._id })
  //         .sort({ n: 1 })
  //         .toArray(function (err, chunks) {
  //           if (err) {
  //             return res.render("index", {
  //               title: "Download Error",
  //               message: "Error retrieving chunks",
  //               error: err.errmsg,
  //             });
  //           }
  //           if (!chunks || chunks.length === 0) {
  //             //No data found
  //             return res.render("index", {
  //               title: "Download Error",
  //               message: "No data found",
  //             });
  //           }

  //           let fileData = [];
  //           for (let i = 0; i < chunks.length; i++) {
  //             //This is in Binary JSON or BSON format, which is stored
  //             //in fileData array in base64 endocoded string format

  //             fileData.push(chunks[i].data.toString("base64"));
  //           }

  //           //Display the chunks using the data URI format
  //           let finalFile =
  //             "data:" + docs[0].contentType + ";base64," + fileData.join("");
  //           res.render("imageView", {
  //             title: "Image File",
  //             message: "Image loaded from MongoDB GridFS",
  //             imgurl: finalFile,
  //           });
  //         });
  //     }
  //   });
  // });
  console.log("It reaches the bottom for all videos");
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
    // res.status(200).json({ success: true, testFind });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, err });
  }
};

module.exports = {
  uploadVideoInfo,
  downloadVideo,
  getVideo,
  getVideos,
  deleteVideo,
};
