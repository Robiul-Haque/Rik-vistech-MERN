const Payment = require("./payment.model");

const router = require("express").Router();
// create new

router.post("/", async (req, res) => {
  try {
    const isExist = await Payment.findOne({
      user: req.body.user,
      method: req.body.method,
      account: req.body.account,
    });
    if (isExist) {
      return res.status(400).json({ message: "Payment Method Already Exist" });
    }
    const payment = new Payment(req.body);
    await payment.save();
    res.status(200).json({ message: "Payment Method Added successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/update/:user", async (req, res) => {
  const user = req.params.user;
  const { account } = req.body;
  try {
    const payment = await Payment.findOneAndUpdate(
      { user },
      { account },
      { new: true }
    );
    res.status(200).json(payment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/:user", async (req, res) => {
  const user = req.params.user;
  try {
    const payment = await Payment.find({ user });
    res.status(200).json(payment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// delete

router.delete("/:user", async (req, res) => {
  const user = req.params.user;
  try {
    const payment = await Payment.findOneAndDelete({ user });
    res.status(200).json(payment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
