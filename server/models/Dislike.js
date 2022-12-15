const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// other models have new schema this may be an error

const dislikeSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "MillPrimeUser",
    },
    commentId: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
    videoId: {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Dislike", dislikeSchema);
