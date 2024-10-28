const { Schema, default: mongoose } = require("mongoose");

const userSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
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
    balance: {
      type: Number,
      default: 0,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const SubAdmin = mongoose.model("SubAdmin", userSchema);
module.exports = SubAdmin;
