const router = require("express").Router();

const { authChecker } = require("../../helper/AuthChecker");
const { USER_POPULATED_FIELDS } = require("../../options");
const Course = require("./assignment.model");

// get all courses
router.post("/get", authChecker, async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 30;
    const filters = req.body;

    try {
        const query = {};
        if (filters) {
            Object.keys(filters).forEach((key) => {
                if (filters[key] !== "") {
                    query[key] = filters[key];
                }
            });
        }
        const courses = await Course.find(query)
            .sort({ createdAt: -1 })
            .populate("student", USER_POPULATED_FIELDS)
            .populate("course")
            .limit(limit)
            .skip((page - 1) * limit)
        res.status(200).json(courses)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// get single course 
router.get("/:id", authChecker, async (req, res) => {
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
        await course.updateOne({ $set: req.body }, { new: true })

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