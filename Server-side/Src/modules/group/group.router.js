const Group = require("./group.model");

const router = require("express").Router();

router.get('/', async (req, res) => {
    try {
        const groups = await Group.find()
        res.status(200).json(groups)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
router.get('/:id', async (req, res) => {
    try {
        const groups = await Group.findById(req.params.id)
        res.status(200).json(groups)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
router.post('/', async (req, res) => {
    try {
        const newGroup = new Group(req.body)
        await newGroup.save()
        res.status(200).json({ message: "Group created successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.put('/:id', async (req, res) => {

    try {
        await Group.findByIdAndUpdate(req.params.id, req.body)
        res.send({ message: "Group updated successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        await Group.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "Group deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
module.exports = router