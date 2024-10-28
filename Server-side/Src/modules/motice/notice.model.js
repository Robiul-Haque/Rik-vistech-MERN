const mongoose = require("mongoose");

const groupModel = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);
const Group = mongoose.model("Notice", groupModel);
module.exports = Group;
