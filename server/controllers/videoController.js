const multer = require("multer");
const User = require("../models/userModel");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  //   This is for making sure they only upload MP4 Dont know if multer will accept of types
  fileFilter: (req, file, cd) => {
    const ext = path.extname(file.originalname);
    // May have to use this in the pictures section later
    if (ext !== ".mp4") {
      return cb(res.status(400).end("only MP4 files are allowed"), false);
    }
    cd(null, true);
  },
});

var upload = multer({ storage: storage }).single("file");

const createVideo = async (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
};

module.exports = { createVideo };
