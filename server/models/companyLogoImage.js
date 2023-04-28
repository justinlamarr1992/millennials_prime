const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const businessLogoSchema = new Schema(
  {
    image: String,
    companyName: { type: String },
    industry: { type: String },
    companyOwner: {
      type: Schema.Types.ObjectId,
      ref: "MillPrimeUser",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("businessLogo", businessLogoSchema);
