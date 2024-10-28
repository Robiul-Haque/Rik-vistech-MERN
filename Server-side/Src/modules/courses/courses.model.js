const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide a valid course title"],
    },
    image: {
        type: String,
        required: [true, "Please provide a valid image"],
    },
    category: {
        type: String,
        required: [true, "Please provide a valid Category"],
    },
    learn: {
        type: [String],
        required: [true, "Please provide a valid learn item"],
    },
    description: {
        type: String,
        required: [true, "Please provide a valid description"],
    },
    assignments: {
        type: Number,
        default: 10,
    },
    price: {
        type: Number,
        required: [true, "Please provide a valid price"],
    },
    duration: {
        type: Number,
        required: [true, "Please provide a valid duration"],
    },
    meetingId: {
        type: String,
    },
    footerDes: {
        type: String,
        default: "",
    },
    students: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        default: [],
    },
},
    {
        timestamps: true
    })
const Course = mongoose.model("Course", courseSchema)

module.exports = Course