const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["text", "picture", "video"],
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, default: "" },
    author: {
      type: Schema.Types.ObjectId,
      ref: "MillPrimeUser",
      required: true,
    },
    // picture posts only
    imageUrl: { type: String },
    // video posts only (BunnyCDN GUID — see VideoModel for URL construction)
    videoId: { type: String },
    likeCount: { type: Number, default: 0 },
    commentCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
