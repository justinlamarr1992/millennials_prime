const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// other models have new schema this may be an error

const commentSchema = new Schema(
  {
    writer: { type: Schema.Types.ObjectId, ref: "MillPrimeUser" },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
    responseTo: {
      type: Schema.Types.ObjectId,
      ref: "MillPrimeUser",
    },
    content: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
