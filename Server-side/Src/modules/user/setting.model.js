const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        active_fee: {
            type: Number,
            required: true,
        },
        active_bonus: {
            type: Number,
            required: true,
        },
        refer_bonus: {
            type: Number,
            required: true,
        },
        counsultant_bonus: {
            type: Number,
            required: true,
        },
        gl_bonus: {
            type: Number,
            required: true,
        },
        trainer_bonus: {
            type: Number,
            required: true,
        },
        support_link: {
            type: String,
            default: ""
        },
        due: {
            type: Number,
            default: ""
        },
        helpyou_link: {
            type: String,
            default: ""
        },
        whatsapp: {
            type: String,
            default: ""
        },
        auto_gl: {
            type: String,
            default: ""
        },
        banners: {
            type: Array,
            default: []
        }
    },
    {
        timestamps: true
    }
)

const Setting = mongoose.model("Setting", settingSchema);
module.exports = Setting