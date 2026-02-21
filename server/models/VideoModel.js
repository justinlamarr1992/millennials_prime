const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videoSchema = new Schema(
  {
    // BunnyCDN GUID (e.g. "abc-123-guid"). Required and unique.
    // Frontend constructs the stream URL as: {BUNNYCDN_CDN_URL}/{video}/playlist.m3u8
    // Stored via POST /videos/save → saveVideo controller.
    video: { type: String, unique: true, required: true },
    userPosting: { type: Schema.Types.ObjectId, ref: "MillPrimeUser" },
    title: { type: String, maxlength: 50 },
    description: { type: String },
    prime: { type: String },
    // Legacy fields — unused. Reserved for future local-storage support.
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
