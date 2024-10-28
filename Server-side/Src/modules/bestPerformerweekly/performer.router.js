const { USER_POPULATED_FIELDS } = require("../../options");
const User = require("../user/user.model");
const Group = require("./performer.model");

const router = require("express").Router();

router.get('/', async (req, res) => {
    try {
        const groups = await Group.find()
            .populate("user", "firstName lastName userId role status")
            .exec();
        res.status(200).json(groups)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
router.get('/:id', async (req, res) => {
    try {
        const groups = await Group.findById(req.params.id)
            .populate("user", "firstName lastName userId role status")
            .exec();
        res.status(200).json(groups)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
router.post('/', async (req, res) => {
    try {
        const user = await User.findOne({ userId: req.body.user })
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const newGroup = new Group({ ...req.body, user: user._id })

        await newGroup.save()
        res.status(200).json({ message: "Data created successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.put('/:id', async (req, res) => {

    try {
        await Group.findByIdAndUpdate(req.params.id, req.body)
        res.send({ message: "Data updated successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        await Group.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "Data deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
module.exports = router