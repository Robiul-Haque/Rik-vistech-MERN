const { authChecker } = require("../../helper/AuthChecker");
const { USER_POPULATED_FIELDS } = require("../../options");
const User = require("../user/user.model");
const Request = require("./request.model");

const router = require("express").Router();

router.get("/all", authChecker, async (req, res) => {
    try {
        const request = await Request.find()
            .populate("user", USER_POPULATED_FIELDS)
            .populate("requester", USER_POPULATED_FIELDS)
            .sort({ createdAt: -1 })
            .exec();
        res.status(200).json(request);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})
router.get("/consultant/:id", authChecker, async (req, res) => {
    try {
        const request = await Request.find({ requester: req.params.id })
            .populate("user", USER_POPULATED_FIELDS)
            .populate("requester", USER_POPULATED_FIELDS)
            .sort({ createdAt: -1 })
            .exec();
        res.status(200).json(request);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})
router.post("/", authChecker, async (req, res) => {
    try {
        const isExist = await Request.findOne({
            user: req.body.user,
            sc: req.body.sc
        })
        if (isExist) {
            return res.status(400).json({ message: "Request Already Exist Please Wait" });
        }
        const request = new Request(req.body);
        await request.save();
        res.status(200).json({ message: "Request created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.put("/a-r", authChecker, async (req, res) => {
    const { id, type } = req.body
    try {
        if (type == "accept") {
            const request = await Request.findById(id)

            if (!request) {
                return res.status(404).json({ message: "Request not found" });
            }
            const consultant = await User.findById(request.requester)

            await Request.findByIdAndUpdate(id, { status: "accepted" }, { new: true });
            await User.updateOne({ _id: request.user },
                { "settings.consultant": consultant.userId },
                { new: true }
            )
            res.status(200).json({ message: "Request updated successfully" });
        }
        else{
            await Request.findByIdAndUpdate(id, { status: "rejected" }, { new: true });
            res.status(200).json({ message: "Request updated successfully" });
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})
router.get("/:id", authChecker, async (req, res) => {
    try {
        const request = await Request.findById(req.params.id)
            .populate("user", USER_POPULATED_FIELDS)
            .exec();
        res.status(200).json(request);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.delete("/:id", authChecker, async (req, res) => {
    try {
        const request = await Request.findByIdAndDelete(req.params.id);
        if (!request) {
            return res.status(404).json({ message: "Request not found" });
        }
        res.status(200).json({ message: "Request deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})
module.exports = router