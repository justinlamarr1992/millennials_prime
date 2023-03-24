const express = require("express");
const multer = require("multer");
var ffmpeg = require("fluent-ffmpeg");
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
  console.log("Do I make it here?");

  // res
  //   .status(200)
  //   .json({ success: true, message: "Info was pasted", info: req.body });
};
// const updatesMetadata = async () => {
//   gfs;

//   const fileIdNum = "6414ef87f1e479e5891654f2";

//   let fileId = mongoose.Types.ObjectId(fileIdNum);
//   console.log(fileId);

//   const file = await collection.findOne({ _id: fileId });

//   const updatedMetadata = { newKey: "newValue" };
//   const updateFile = { ...file, metadata: updatedMetadata };

//   await collection.replaceOne({ _id: fileId }, updatedFile);

//   console.log("Metadata updated successfully");
//   client.close();
// };

const updatesMetadata = async (req, res, next) => {
  // const uri =
  //   "mongodb+srv://MPrime:MPrimepassword1!@millennialsprime.t11nr.mongodb.net/?retryWrites=true&w=majority";
  // const client = new MongoClient(uri, { useNewUrlParser: true });

  const fileId = new ObjectId("63d40176741612651ed5f84c");

  const file = await gfs.find({ _id: fileId }).toArray();
  console.log(file);
  await gfs.delete({ _id: fileId });

  // const metadata = file[0].metadata;
  // metadata.custom_field = "custom_value";
  // console.log(metadata);

  // await gfs.updateOne({ _id: fileId }, { $set: { metadata: metadata } });
  // const update = await gfs.updateOne()(
  //   { _id: fileId },
  //   { $set: { metadata: metadata } }
  // );
  // console.log(update);

  // async function connect() {
  //   await client.connect();
  //   const db = client.db("videos");
  //   const bucket = new GridFSBucket(db);
  //   console.log(bucket);

  //   const fileId = new ObjectId("6414ef87f1e479e5891654f2");

  //   const file = await bucket.find({ _id: fileId }).toArray();
  //   const metadata = file[0].metadata;
  //   metadata.custom_field = "custom_value";

  //   await bucket.updateOne({ _id: fileId }, { $set: { metadata: metadata } });
  // }
};

const downloadVideo = async (req, res) => {};
const deleteVideo = async (req, res) => {
  const fileId = new ObjectId("63d40176741612651ed5f84c");

  const file = await gfs.find({ _id: fileId }).toArray();
  console.log(file);
  await gfs.delete({ _id: fileId });

  const metadata = file[0].metadata;
  metadata.custom_field = "custom_value";
  console.log(metadata);

  // await gfs.updateOne({ _id: fileId }, { $set: { metadata: metadata } });
  const update = await gfs.updateOne()(
    { _id: fileId },
    { $set: { metadata: metadata } }
  );
  console.log(update);
};

module.exports = {
  uploadVideoInfo,
  downloadVideo,
  updatesMetadata,
  deleteVideo,
};
