const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  // {
  //   username: {
  //     type: String,
  //     required: true,
  //   },
  //   roles: {
  //     User: {
  //       type: Number,
  //       default: 2001,
  //     },
  //     Editor: Number,
  //     Admin: Number,
  //   },
  //   password: {
  //     type: String,
  //     required: true,
  //   },
  //   refreshToken: [String],
  // }
  {
    username: {
      type: String,
      required: true,
    },
    // name: { type: String, required: true },
    lastname: { type: String, maxlength: 50 },
    email: { type: String, require: true, unique: 1 },
    password: { type: String, required: true, minlength: 6 },
    // role: { type: Number, default: 0 },
    roles: {
      User: {
        type: Number,
        default: 2001,
      },
      Editor: Number,
      Admin: Number,
    },
    image: String,
    token: { type: String },
    tokenExp: { type: Number },
    refreshToken: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
