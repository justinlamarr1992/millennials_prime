const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    firstName: { type: String, maxlength: 50 },
    lastName: { type: String, maxlength: 50 },
    DOB: { type: Date },
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
    location: {
      country: { type: String },
      city: { type: String },
      state: { type: String },
      zip: { type: Number },
    },
    businessOwner: {
      entrepreneur: { type: Boolean },
      industry: { type: String },
      open: { type: Boolean },
    },
    image: String,
    // token: { type: String },
    // tokenExp: { type: Number },
    refreshToken: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("MillPrimeUser", userSchema);
