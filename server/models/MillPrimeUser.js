const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    profilePic: {
      type: Schema.Types.ObjectId,
      ref: "image",
    },
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
    // change too just business
    business: {
      entrepreneur: { type: Boolean },
      industry: { type: String },
      whyIndustry: { type: String },
      openOnMillPrime: { type: Boolean },
      lengthOpen: { type: String },
      whyBusiness: { type: String },
      firstObjective: { type: String },
      objectiveNow: { type: String },
      howMany: { type: String },
      productsAndServices: { type: String },
      primaryPromotion: { type: String },
      factorsOfLocation: { type: String },
    },
    art: {
      artist: { type: Boolean },
      professional: { type: Boolean },
      purpose: { type: String },
      affectIssues: { type: String },
      navigateIndustry: { type: String },
      inspirationOfWork: { type: String },
      styleChanged: { type: String },
      favsOrNoneFavs: { type: String },
      network: { type: Boolean },
      support: { type: String },
      critics: { type: String },
      specificIntegral: { type: Boolean },
      whatSpecfic: { type: String },
    },
    // token: { type: String },
    // tokenExp: { type: Number },
    refreshToken: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("MillPrimeUser", userSchema);
