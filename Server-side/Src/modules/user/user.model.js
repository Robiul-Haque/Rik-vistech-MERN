const { Schema, default: mongoose } = require("mongoose");

const userSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    ref_limit: {
      type: Number,
      default: 0,
    },
    due: {
      type: Number,
      default: 0,
    },
    time: {
      type: String
    },
    date: {
      type: String
    },
    firstName: {
      type: String,
      required: [true, "Please provide a First Name"],
    },
    lastName: {
      type: String,
      required: [true, "Please provide a Last Name"],
    },
    email: {
      type: String,
      required: [true, "Please provide a email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
    phone: {
      type: String,
      required: [true, "Please provide a phone number"],
      unique: true,
    },
    whatsapp: {
      type: String,
      required: [true, "Please provide a WhatsApp number"],
      unique: true,
    },
    telegram: {
      type: String,
    },
    country: {
      type: String,
      required: [true, "Please provide a country"],
    },
    language: {
      type: String,
      required: [true, "Please provide a language"],
    },
    image: {
      type: String,
      default:
        "https://t3.ftcdn.net/jpg/02/09/37/00/360_F_209370065_JLXhrc5inEmGl52SyvSPeVB23hB6IjrR.jpg",
    },
    reference: {
      type: String,
      default: "",
    },
    balance: {
      type: Number,
      default: 0,
    },
    course: {
      type: Schema.Types.ObjectId,
    },
    courses: {
      type: Array,
      default: [],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    developer: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      default: "inactive",
    },
    role: {
      type: String,
      default: "user",
    },
    trainer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    groupLeader: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
    locked: {
      type: Boolean,
      default: false,
    },
    permission: {
      type: Boolean
    },
    settings: {
      firstWithdrawal: {
        type: Boolean,
        default: false
      },
      controller: {
        type: String,
      },
      sc: {
        type: String,
      },
      consultant: {
        type: String,
      },
      teacher: {
        type: String,
      },
      trainer: {
        type: String,
      },
      sgl: {
        type: String
      },
      gl: {
        type: String,
        ref: "User",
      },
      activates: {
        type: Date,
      },
      activeNotice: {
        type: Boolean,
        default: true,
      },
      inactiveBonus: {
        type: Boolean,
        default: false,
      },
      activeBonus: {
        type: Boolean,
        default: false,
      },
      withdrawalFee: {
        type: Boolean,
        default: false,
      },
      sendWish: {
        type: Boolean,
        default: false,
      },
      sendMessage: {
        type: Date,
      },
      messageError: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
