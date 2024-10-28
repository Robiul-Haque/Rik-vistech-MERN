const { assignCradit, assignDebit } = require("../../helper/passbook/passbook");
const { USER_POPULATED_FIELDS } = require("../../options");
const Passbook = require("./passbook.model");
const User = require("../user/user.model");
const { default: mongoose } = require("mongoose");
const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const passbooks = await Passbook.find().populate("withdraw").exec();
    res.status(200).json(passbooks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    // if (typeof req.body.user !== mongoose.Types.ObjectId) {
    //   const user = await User.findOne({ userId: req.body.user });
    //   if (!user) {
    //     return res.status(404).json({ message: "User not found" });
    //   }
    //   const newData = new Passbook({ ...req.body, user: user._id });
    //   await newData.save();
    // }
    // else {
    //   const newData = new Passbook(req.body);
    //   await newData.save();
    // }
    await assignCradit(req.body);
    res.status(200).json({
      message:
        req.body.type === "cradit"
          ? "Cradit added successfully"
          : "Debit added successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/cradit/:id", async (req, res) => {
  const limit = parseInt(req.query.limit) || 100;
  const skipIndex = (req.query.skip || 0) * limit;

  try {
    const passbook = await Passbook.find({
      user: req.params.id,
      type: "cradit",
    })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skipIndex)
      .populate("withdraw")
      .exec();

    const totalDocuments = await Passbook.countDocuments();

    res.status(200).json({
      total: totalDocuments,
      passbook,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/debit/:id", async (req, res) => {
  const limit = parseInt(req.query.limit) || 100;
  const skipIndex = (req.query.skip || 0) * limit;
  try {
    const passbook = await Passbook.find({
      user: req.params.id,
      type: "debit",
    })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skipIndex)
      .populate("withdraw")
      .exec();

    const totalDocuments = await Passbook.countDocuments();

    res.status(200).json({
      total: totalDocuments,
      passbook,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
