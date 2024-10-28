const { authChecker } = require("../../helper/AuthChecker");
const { USER_POPULATED_FIELDS } = require("../../options");
const Refer = require("./refer.model");

const router = require("express").Router();

router.post("/", authChecker, async (req, res) => {
  try {
    const refer = new Refer(req.body);
    await refer.save();
    res.status(201).json(refer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
})

router.get("/", authChecker, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skipIndex = (page - 1) * limit;
  try {
    const refer = await Refer.find()
      .populate("referer", USER_POPULATED_FIELDS)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skipIndex)
      .exec();
    res.status(200).json(refer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/user/:id", authChecker, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skipIndex = (page - 1) * limit;
  const status = req.query.status;

  try {
    const refer = await Refer.find({
      referer: req.params.id,
    })
      .populate("user", USER_POPULATED_FIELDS)
      .sort({ createdAt: -1 })
      .exec();
    const active = refer.filter((data) => {
      return data.user.status === "active";
    }).length;
    const inactive = refer.filter((data) => {
      return data.user.status === "inactive";
    }).length;
    if (status) {
      const finalFilter = refer.filter((data) => {
        return data.user.status === status;
      });
      res.status(200).json({ count: finalFilter.length, active, inactive, data: finalFilter.slice(skipIndex, skipIndex + limit) });
    }
    else {
      res.status(200).json({ count: refer.length, active, inactive, data: refer.slice(skipIndex, skipIndex + limit) });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
