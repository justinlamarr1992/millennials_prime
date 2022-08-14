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
    user_id: { type: String, required: true },
    name: { type: String, required: true },
  },
  { timestamps: true },
  { typeKey: "$type" }
);

module.exports = mongoose.model("post", postSchema);

// ADD To DATABASE NOTES
// in order to save to database you need to add object here (name: type)
