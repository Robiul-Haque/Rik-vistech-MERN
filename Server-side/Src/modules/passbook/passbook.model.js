const mongoose = require("mongoose");

const uploadSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    source: {
      type: String,
    },
    userId: {
      type: String,
    },
    account: {
      type: String,
    },
    method: {
      type: String,
    },
    status: {
      type: String,
    },
    withdraw: {
      type: mongoose.Schema.Types.ObjectId ,
      ref: "Withdraw",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
const Passbook = mongoose.model("Passbook", uploadSchema);
module.exports = Passbook;
