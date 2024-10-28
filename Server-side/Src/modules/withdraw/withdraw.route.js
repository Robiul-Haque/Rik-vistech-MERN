const { authChecker } = require("../../helper/AuthChecker");
const { USER_POPULATED_FIELDS } = require("../../options");
const Passbook = require("../passbook/passbook.model");
const User = require("../user/user.model");
const Withdraw = require("./withdraw.model");

const router = require("express").Router();

router.post("/", authChecker, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.user });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.settings.firstWithdrawal && req.body.amount < 1000) {
      return res.status(400).json({ message: "Minimum withdrawal amount is 1000 point" });
    }
    if (!user.settings.firstWithdrawal && req.body.amount < 3000) {
      return res.status(400).json({ message: "Minimum withdrawal amount is 3000 point" });
    }

    if (user.balance < req.body.amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // Remove _id field if it's being set manually
    delete req.body._id;

    const withdraw = new Withdraw(req.body);
    const savedWithdraw = await withdraw.save();

    await User.updateOne(
      { _id: req.body.user },
      { $inc: { balance: -req.body.amount }, "settings.firstWithdrawal": true, }
    );

    const newTransaction = new Passbook({
      user: req.body.user,
      type: "debit",
      amount: req.body.amount,
      withdraw: savedWithdraw._id,
    });
    await newTransaction.save();

    res.status(200).json({ message: "Withdraw created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/accept/:id', authChecker, async (req, res) => {

  try {
    const withdraw = await Withdraw.findByIdAndUpdate(req.params.id, {
      status: "accepted"
    })
    if (!withdraw) {
      return res.status(404).json({ message: "Withdraw not found" });
    }
    res.status(200).json({ message: "Withdraw updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

router.put('/reject/:id', authChecker, async (req, res) => {

  try {

    const withdraw = await Withdraw.findById(req.params.id);
    if (!withdraw) {
      return res.status(404).json({ message: "Withdraw not found" });
    }
    const user = await User.findById(withdraw.user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await Withdraw.findByIdAndUpdate(withdraw._id, {
      status: "rejected"
    })
    await User.updateOne({ _id: withdraw.user }, { $inc: { balance: withdraw.amount } })
    res.status(200).json({ message: "Withdraw updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

router.get("/", authChecker, async (req, res) => {
  try {
    const withdraw = await Withdraw.find()
      .populate("user", USER_POPULATED_FIELDS)
      .exec();
    res.status(200).json(withdraw);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", authChecker, async (req, res) => {
  try {
    const withdraw = await Withdraw.findById(req.params.id)
      .populate("user", USER_POPULATED_FIELDS)
      .exec();
    res.status(200).json(withdraw);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/status/:id/:type', authChecker, async (req, res) => {
  const { id, type } = req.params
  try {
    const withdraw = await Withdraw.findById(id)
    if (!withdraw) {
      return res.status(404).json({ message: "Withdraw not found" });
    }
    if (type === "accept") {
      await Withdraw.updateOne({ _id: id }, { status: "accept" });
      res.status(200).json({ message: "Withdraw Accepted successfully" });
    }
    else {
      await Withdraw.updateOne({ _id: id }, { status: "reject" });
      await User.updateOne({ _id: withdraw.user }, { $inc: { balance: withdraw.amount } });
      res.status(200).json({ message: "Withdraw Rejected successfully" });
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

module.exports = router;
