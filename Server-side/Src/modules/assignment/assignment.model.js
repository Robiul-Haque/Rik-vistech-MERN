const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Course",
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    assignment: {
        type: String,
        required: true,
    },
    marks: {
        type: Number,
    },
    status: {
        type: String,
        default: "pending"
    }
}, { timestamps: true })
const Assignment = mongoose.model("Assignment", courseSchema)

module.exports = Assignment