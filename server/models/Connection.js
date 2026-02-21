const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const connectionSchema = new Schema(
  {
    requester: {
      type: Schema.Types.ObjectId,
      ref: "MillPrimeUser",
      required: true,
    },
    recipient: {
      type: Schema.Types.ObjectId,
      ref: "MillPrimeUser",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "declined"],
      required: true,
      default: "pending",
    },
  },
  { timestamps: true }
);

connectionSchema.index({ requester: 1, recipient: 1 }, { unique: true });

module.exports = mongoose.model("Connection", connectionSchema);
