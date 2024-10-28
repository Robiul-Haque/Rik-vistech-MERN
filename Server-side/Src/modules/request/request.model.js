
const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
    {
        requester: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        status: {
            type: String,
            default: "pending"
        }
    },
    {
        timestamps: true
    }
);

const Request = mongoose.model("Request", requestSchema);

module.exports = Request