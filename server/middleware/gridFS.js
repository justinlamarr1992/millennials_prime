const mongoose = require("mongoose");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
var crypto = require("crypto");
// const path = require("node:path");
const path = require("path");

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

//Create Storage Engine
let updatedMetadata;

const updateMetadata = (id) => {
  updatedMetadata = id;
  //   console.log("This is what I need Pasted",     updatedMetadata);
};

const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        console.log("RANDOM CHECK");
        const fileInfo = {
          filename: filename,
          bucketName: "videos",
          // metadata: updatedMetadata ? updatedMetadata : null,
          metadata: {
            userPosting: "TEsting",
            title: "TEsting",
            description: "TEsting",
            prime: "prime",
            file: "TEsting",
            category: "TEsting",
            duration: "TEsting",
            thumbnail: "TEsting",
          },
        };
        resolve(fileInfo);
      });
    });
  },
});

const uploadEngine = multer({ storage });

module.exports = {
  engine: uploadEngine,
  updateMetadata,
  gfs,
};
