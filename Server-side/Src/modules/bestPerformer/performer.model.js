const mongoose = require("mongoose");

const groupModel = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);
const Group = mongoose.model("Perpormer", groupModel);
module.exports = Group;
