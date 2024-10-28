const mongoose = require("mongoose");

// const walletSchema = new mongoose.Schema(
//   {
//     user: {
//       type: String,
//       ref: "User",
//     },
//     referer: {
//       type: String,
//       ref: "User",
//     },
//   },
//   {
//     timestamps: true,
//   }
// )
// );
const walletSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    referer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
const Refer = mongoose.model("Refer", walletSchema);
module.exports = Refer;
