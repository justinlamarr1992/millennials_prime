// const mongoose = require("mongoose");
// const multer = require("multer");
// const { GridFsStorage } = require("multer-gridfs-storage");
// const { ObjectId } = require("mongodb");
// const Grid = require("gridfs-stream");
// var crypto = require("crypto");
// const path = require("path");

// const url = process.env.MONGO_URI;
// const connect = mongoose.createConnection(url, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// let gfs;
// connect.once("open", () => {
//   gfs = new mongoose.mongo.GridFSBucket(connect.db, {
//     bucketName: "videos",
//   });
// });

// //Create Storage Engine
// let updatedMetadata;

// const updateMetadata = (id) => {
//   updatedMetadata = id;
//   //   console.log("This is what I need Pasted",     updatedMetadata);
// };

// const storage = new GridFsStorage({
//   url: process.env.MONGO_URI,
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//       crypto.randomBytes(16, (err, buf) => {
//         if (err) {
//           return reject(err);
//         }
//         const filename = buf.toString("hex") + path.extname(file.originalname);
//         const fileInfo = {
//           filename: filename,
//           bucketName: "videos",
//           metadata: {
//             userPosting: new ObjectId(req.body.userPosting),
//             title: req.body.title,
//             description: req.body.description,
//             prime: req.body.prime,
//             file: req.body.file,
//             category: req.body.category,
//             duration: req.body.duration,
//             thumbnail: req.body.thumbnail,
//           },
//         };
//         console.log("GRIDFS REQ.BODY", req.body);

//         resolve(fileInfo);
//       });
//     });
//   },
// });

// const uploadEngine = multer({ storage });

// module.exports = {
//   engine: uploadEngine,
//   updateMetadata,
//   gfs,
// };
