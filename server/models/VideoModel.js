const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// other models have new schema this may be an error

const videoSchema = mongoose.Schema(
  {
    userPosting: { type: Schema.Types.ObjectId, ref: "User" },
    title: { type: String, maxlength: 50 },
    description: { type: String },
    // replaces his privacy
    prime: { type: Number },
    filePath: { type: String },
    category: String,
    views: { type: Number, default: 0 },
    duration: { type: String },
    thumbnail: { type: String },
  },
  { timestamps: true }
);

const Video = mongoose.model("Video", videoSchema);

module.exports = { Video };
