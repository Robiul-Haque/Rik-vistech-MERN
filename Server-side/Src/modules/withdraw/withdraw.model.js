const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    method: {
      type: String,
      default: 0,
    },
    account: {
      type: String,
      required: true,
    },
    status: {
        type: String,
        default: "pending"
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
const Withdraw = mongoose.model("Withdraw", walletSchema);
module.exports = Withdraw;
