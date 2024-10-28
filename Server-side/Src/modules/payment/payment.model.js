const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema(
  {
    account: {
      type: String,
      required: true,
    },
    method: {
      type: String,
      required: true,
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
const Payment = mongoose.model("PaymentMethod", walletSchema);
module.exports = Payment;
