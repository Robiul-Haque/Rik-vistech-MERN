const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true,
        },
        code: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const Code = mongoose.model("Code", settingSchema);
module.exports = Code