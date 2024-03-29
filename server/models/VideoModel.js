const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// other models have new schema this may be an error

const videoSchema = new Schema(
  {
    video: String,
    userPosting: { type: Schema.Types.ObjectId, ref: "MillPrimeUser" },
    title: { type: String, maxlength: 50 },
    description: { type: String },
    // replaces his privacy
    prime: { type: String },
    filePath: { type: String },
    file: { type: String },
    category: String,
    comments: { type: Schema.Types.ObjectId, ref: "Comment" },
    likes: { type: Schema.Types.ObjectId, ref: "Like" },
    dislikes: { type: Schema.Types.ObjectId, ref: "Dislike" },
    views: { type: Number, default: 0 },
    duration: { type: String },
    thumbnail: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Video", videoSchema);
