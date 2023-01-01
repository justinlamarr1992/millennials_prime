const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageSchema = new Schema(
  {
    image: String,
  }
  //   { timestamps: true }
);

module.exports = mongoose.model("image", imageSchema);
