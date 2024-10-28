const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./admin.model");
const { authChecker } = require("../../helper/AuthChecker");
const {
  REFRESH_TOKEN_COOKIE_OPTIONS,
  TOKEN_NAME,
  userIgnoreFeilds,
  USER_POPULATED_FIELDS,
} = require("../../options");
const Passbook = require("../passbook/passbook.model");

router.get("/", authChecker, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 100;
  const skipIndex = (page - 1) * limit;
  try {
    const users = await User.find()
      .select(userIgnoreFeilds)
      .limit(limit)
      .skip(skipIndex)
      .exec();

    const totalDocuments = await User.countDocuments();
    const totalPages = Math.ceil(totalDocuments / limit);
    res.status(200).json({
      count: totalDocuments,
      totalPages: totalPages,
      currentPage: page,
      fast: limit * page,
      length: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", authChecker, async (req, res) => {
  try {
    const user = await User.findOne({
      $or: [
        { phone: req.params.id },
        { email: req.params.id },
        { whatsapp: req.params.id },
      ],
    })
      .select(userIgnoreFeilds)
      .exec();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/current-user", authChecker, async (req, res) => {
  const userId = req.user.email;

  try {
    const user = await User.findOne({
      $or: [{ phone: userId }, { email: userId }, { whatsapp: userId }],
    })
      .select(userIgnoreFeilds)
      .populate("settings.admin", USER_POPULATED_FIELDS)
      .exec();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post("/register", async (req, res) => {
  const data = req.body;
  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await User.findOne({
      $or: [
        { phone: data.phone },
        { email: data.email },
        { whatsapp: data.whatsapp },
      ],
    });
    if (user) {
      return res.status(409).json({ message: "User already exists" });
    }
    const lastUser = await User.findOne()
      .select({ userId: 1 })
      .sort({ _id: -1 })
      .exec();
    const userId = lastUser ? Number(lastUser.userId) + 1 : 231000;
    const newUser = new User({
      ...data,
      password: hashedPassword,
      userId,
    });
    const savedUser = await newUser.save();

    res.send({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      $or: [{ phone: email }, { email: email }],
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    } else {
      const secret = process.env.JWT_SECRET;
      const accessToken = jwt.sign(
        { email: user.email, phone: user.phone },
        secret,
        { expiresIn: "30d" }
      );
      res.cookie(TOKEN_NAME.ACCESS, accessToken, REFRESH_TOKEN_COOKIE_OPTIONS);
      res.send({ message: "Login successful", accessToken: accessToken });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.put("/update/:id", authChecker, async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    ).exec();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
