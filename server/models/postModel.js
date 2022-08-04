const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    // user: {
    //   type: Object,
    //   required: true,
    // },
    // pic: { type: String },
    // postedDate: { type: String, required: true },
    // id: { type: Number, required: true, unique: true },
    title: { type: String },
    status: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("post", postSchema);
