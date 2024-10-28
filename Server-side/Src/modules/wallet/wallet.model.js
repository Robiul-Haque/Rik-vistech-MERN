const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema(
  {
    balance: {
      type: Number,
      required: true,
    },
    due: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Wallet = mongoose.model("Wallet", walletSchema);
module.exports = Wallet;
