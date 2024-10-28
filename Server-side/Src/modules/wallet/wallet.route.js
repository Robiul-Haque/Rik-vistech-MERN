const { authChecker } = require("../../helper/AuthChecker");
const Wallet = require("./wallet.model");

const router = require("express").Router();

router.put("/", authChecker, async (req, res) => {
  try {
    const userId = req.body.user;
    const isExist = await Wallet.findOne({ user: userId });
    if (isExist) {
      await Wallet.findOneAndUpdate(
        { user: userId },
        { $inc: { balance: req.body.amount } }
      );
      res.status(200).json({ message: "Wallet updated successfully" });
    } else {
      const wallet = new Wallet({ user: userId, balance: req.body.amount });
      await wallet.save();
      res.status(200).json({ message: "Wallet updated successfully" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/:user", authChecker, async (req, res) => {
  try {
    const wallet = await Wallet.findOne({ user: req.params.user });
    res.status(200).json(wallet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/due", authChecker, async (req, res) => {
  try {
    const userId = req.body.user;
    const isExist = await Wallet.findOne({ user: userId });
    if (!isExist) {
      return res.status(404).json({ message: "Wallet not found" });
    }
    if (isExist.balance < isExist.due) {
      return res.status(400).json({ message: "Insufficient balance" });
    }
    await Wallet.findOneAndUpdate(
      { user: userId },
      { due: 0, balance: isExist.balance - isExist.due }
    );
    res.status(200).json({ message: "Wallet updated successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
