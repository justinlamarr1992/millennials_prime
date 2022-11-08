const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// other models have new schema this may be an error

const videoSchema = new Schema(
  {
    // TODO: LAter change this back so the rela info can be related to user
    userPosting: { type: Schema.Types.ObjectId, ref: "MillPrimeUser" },
    title: { type: String, maxlength: 50 },
    description: { type: String },
    // replaces his privacy
    prime: { type: String },
    filePath: { type: String },
    category: String,
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    views: { type: Number, default: 0 },
    duration: { type: String },
    thumbnail: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Video", videoSchema);
