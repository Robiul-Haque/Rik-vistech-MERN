const mongoose = require("mongoose");

const groupModel = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        link: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);
const Group = mongoose.model("Group", groupModel);
module.exports = Group;
