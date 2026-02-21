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
    pairKey: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Enforce uniqueness for both directions: (A→B) and (B→A) share the same pairKey
connectionSchema.index({ pairKey: 1 }, { unique: true });
// Keep directional index for query performance
connectionSchema.index({ requester: 1, recipient: 1 });

connectionSchema.pre("validate", function (next) {
  this.pairKey = [this.requester.toString(), this.recipient.toString()].sort().join("_");
  next();
});

module.exports = mongoose.model("Connection", connectionSchema);
