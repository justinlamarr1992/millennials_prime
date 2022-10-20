const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// other models have new schema this may be an error

const subscriberSchema = new Schema(
  {
    userTo: {
      type: Schema.Types.ObjectId,
      ref: "MillPrimeUser",
    },
    userFrom: {
      type: Schema.Types.ObjectId,
      ref: "MillPrimeUser",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Video", videoSchema);
