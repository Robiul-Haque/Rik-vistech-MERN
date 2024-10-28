const router = require("express").Router();

const { authChecker } = require("../../helper/AuthChecker");
const Course = require("./courses.model");

// get all courses
router.get("/", async (req, res) => {
    try {
        const courses = await Course.find()
        res.status(200).json(courses)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// get single course 
router.get("/:id", async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)
        res.status(200).json(course)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// create new Course
router.post("/", authChecker, async (req, res) => {
    try {
        const newCourse = await Course(req.body)
        await newCourse.save()
        res.status(200).json({ message: "Course created successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// update Course
router.put("/:id", authChecker, async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)
        await course.updateOne({ $set: req.body })
        res.status(200).json({ message: "Course updated successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// delete Course
router.delete("/:id", authChecker, async (req, res) => {
    try {
        await Course.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "Course deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router