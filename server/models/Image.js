const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageSchema = new Schema(
  {
    image: String,
    userID: {
      type: Schema.Types.ObjectId,
      ref: "MillPrimeUser",
    },
    title: { type: String, maxlength: 50 },
    description: { type: String },
    comments: { type: Schema.Types.ObjectId, ref: "Comment" },
    likes: { type: Schema.Types.ObjectId, ref: "Like" },
    dislikes: { type: Schema.Types.ObjectId, ref: "Dislike" },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("image", imageSchema);
