const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    firstname: { type: String, maxlength: 50 },
    lastname: { type: String, maxlength: 50 },
    email: { type: String },
    password: { type: String, minlength: 6 },
    roles: {
      User: {
        type: Number,
        default: 2001,
      },
      Editor: Number,
      Admin: Number,
    },
    image: String,
    // token: { type: String },
    // tokenExp: { type: Number },
    refreshToken: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("MillPrimeUser", userSchema);
