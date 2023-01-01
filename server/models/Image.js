const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageSchema = new Schema(
  {
    image: String,
    userID: {
      type: Schema.Types.ObjectId,
      ref: "MillPrimeUser",
    },
  }
  //   { timestamps: true }
);

module.exports = mongoose.model("image", imageSchema);
