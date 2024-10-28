const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./user.model");
const { authChecker } = require("../../helper/AuthChecker");
const {
  REFRESH_TOKEN_COOKIE_OPTIONS,
  TOKEN_NAME,
  userIgnoreFeilds,
} = require("../../options");
const Refer = require("../referance/refer.model");
const Setting = require("./setting.model");
const { getSetting } = require("../../helper/setting");
const { assignCradit } = require("../../helper/passbook/passbook");
const { passwordResetMail } = require("../../helper/mailer");
const Code = require("./code.model");
const { countStatistics } = require("./countUser");

router.post('/count', authChecker, countStatistics)


router.post("/", authChecker, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 30;
  const skipIndex = (page - 1) * limit;
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

    const date = new Date();
    const start = query["startDate"]
      ? new Date(query["startDate"])
      : new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const end = query["endDate"]
      ? new Date(query["endDate"])
      : new Date(date.getFullYear(), date.getMonth(), date.getDate() + 4);

    if (query["startDate"] || query["endDate"] || Object.keys(query).length === 0) {
      query["createdAt"] = {
        $gte: start, // Today at midnight
        $lt: end,
      };
      // remove start and end
      delete query["startDate"];
      delete query["endDate"];
    }
    if (query.status === "active") {
      query["settings.activates"] = {
        $gte: start, // Today at midnight
        $lt: end,
      };
      delete query["createdAt"];
    }
    // query["role"] = "user";
    const filter = {
      ...query,
    };

    const users = await User.find(filter)
      .select(userIgnoreFeilds)
      .limit(limit)
      .skip(skipIndex)
      .exec();
    const active = await User.countDocuments({
      ...filter,
      status: "active",
    })
    const inactive = await User.countDocuments({
      ...filter,
      status: "inactive",
    })
    const totalDocuments = await User.countDocuments(filter);
    const totalPages = Math.ceil(totalDocuments / limit);
    res.status(200).json({
      count: totalDocuments,
      totalPages: totalPages,
      currentPage: page,
      fast: limit * page,
      length: users.length,
      active: active,
      inactive: inactive,
      data: users,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/role", authChecker, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 30;
  const skipIndex = (page - 1) * limit;
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
    const users = await User.find(query)
      .select(userIgnoreFeilds)
      .limit(limit)
      .skip(skipIndex)
      .populate("course")
      .sort({ createdAt: -1 })
      .exec();

    const totalDocuments = await User.countDocuments(query);
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

router.post("/consultant/:id", authChecker, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 30;
  const skipIndex = (page - 1) * limit;
  const consultant = req.params.id;
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
    const date = new Date();
    const start = query["startDate"]
      ? new Date(query["startDate"])
      : new Date(date.getFullYear(), date.getMonth(), date.getDate() - 6);
    const end = query["endDate"]
      ? new Date(query["endDate"])
      : new Date(date.getFullYear(), date.getMonth(), date.getDate() + 4);

    if (query["startDate"] || query["endDate"]) {
      query["createdAt"] = {
        $gte: start, // Today at midnight
        $lt: end,
      };
      // remove start and end
      delete query["startDate"];
      delete query["endDate"];
    }
    query["settings.consultant"] = consultant;
    // console.log(query)
    const users = await User.find(query)
      .select(userIgnoreFeilds)
      .limit(limit)
      .skip(skipIndex)
      .sort({ createdAt: -1 })
      .exec();

    const totalDocuments = await User.countDocuments({ "settings.consultant": consultant });
    const totalResult = await User.countDocuments(query);
    const active = await User.countDocuments({ "settings.consultant": consultant, status: "active" });
    const inactive = await User.countDocuments({ "settings.consultant": consultant, status: "inactive" });
    const totalPages = Math.ceil(totalDocuments / limit);
    res.status(200).json({
      count: totalDocuments,
      totalPages: totalPages,
      active,
      inactive,
      currentPage: page,
      fast: limit * page,
      results: totalResult,
      data: users,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/gl-user/:id", authChecker, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 30;
  const skipIndex = (page - 1) * limit;
  const consultant = req.params.id;
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
    const date = new Date();
    const start = query["startDate"]
      ? new Date(query["startDate"])
      : new Date(date.getFullYear(), date.getMonth(), date.getDate() - 6);
    const end = query["endDate"]
      ? new Date(query["endDate"])
      : new Date(date.getFullYear(), date.getMonth(), date.getDate() + 4);

    if (query["startDate"] || query["endDate"]) {
      query["createdAt"] = {
        $gte: start, // Today at midnight
        $lt: end,
      };
      // remove start and end
      delete query["startDate"];
      delete query["endDate"];
    }
    query["settings.gl"] = consultant;
    // console.log(query)
    const users = await User.find(query)
      .select(userIgnoreFeilds)
      .limit(limit)
      .skip(skipIndex)
      .sort({ createdAt: -1 })
      .exec();

    const totalDocuments = await User.countDocuments({ "settings.gl": consultant });
    const totalResult = await User.countDocuments(query);
    const active = await User.countDocuments({ "settings.gl": consultant, status: "active" });
    const inactive = await User.countDocuments({ "settings.gl": consultant, status: "inactive" });
    const totalPages = Math.ceil(totalDocuments / limit);
    res.status(200).json({
      count: totalDocuments,
      totalPages: totalPages,
      active,
      inactive,
      currentPage: page,
      fast: limit * page,
      results: totalResult,
      data: users,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/trainer-user/:id", authChecker, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 30;
  const skipIndex = (page - 1) * limit;
  const consultant = req.params.id;
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
    const date = new Date();
    const start = query["startDate"]
      ? new Date(query["startDate"])
      : new Date(date.getFullYear(), date.getMonth(), date.getDate() - 6);
    const end = query["endDate"]
      ? new Date(query["endDate"])
      : new Date(date.getFullYear(), date.getMonth(), date.getDate() + 4);

    if (query["startDate"] || query["endDate"]) {
      query["createdAt"] = {
        $gte: start, // Today at midnight
        $lt: end,
      };
      // remove start and end
      delete query["startDate"];
      delete query["endDate"];
    }
    query["settings.trainer"] = consultant;
    // console.log(query)
    const users = await User.find(query)
      .select(userIgnoreFeilds)
      .limit(limit)
      .skip(skipIndex)
      .sort({ createdAt: -1 })
      .exec();

    const totalDocuments = await User.countDocuments({ "settings.trainer": consultant });
    const totalResult = await User.countDocuments(query);
    const active = await User.countDocuments({ "settings.trainer": consultant, status: "active" });
    const inactive = await User.countDocuments({ "settings.trainer": consultant, status: "inactive" });
    const totalPages = Math.ceil(totalDocuments / limit);
    res.status(200).json({
      count: totalDocuments,
      totalPages: totalPages,
      active,
      inactive,
      currentPage: page,
      fast: limit * page,
      results: totalResult,
      data: users,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post("/", authChecker, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 30;
  const skipIndex = (page - 1) * limit;
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
    const date = new Date();
    const start = query["startDate"]
      ? new Date(query["startDate"])
      : new Date(date.getFullYear(), date.getMonth(), date.getDate() - 6);
    const end = query["endDate"]
      ? new Date(query["endDate"])
      : new Date(date.getFullYear(), date.getMonth(), date.getDate() + 4);

    if (query["startDate"] || query["endDate"]) {
      query["createdAt"] = {
        $gte: start, // Today at midnight
        $lt: end,
      };
      // remove start and end
      delete query["startDate"];
      delete query["endDate"];
    }
    query["role"] = "user";
    const filter = {
      ...query,
    };
    const users = await User.find(filter)
      .select(userIgnoreFeilds)
      .limit(limit)
      .skip(skipIndex)
      .sort({ createdAt: -1 })
      .exec();

    const totalDocuments = await User.countDocuments(filter);
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
// Get Statistic
router.get("/statistic", authChecker, async (req, res) => {
  try {
    const total = await User.countDocuments();
    const active = await User.countDocuments({
      status: "active",
    });
    const inactive = await User.countDocuments({
      status: "inactive",
    });
    res.send({
      total,
      active,
      inactive,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});// Get Statistic
router.post("/statistic", authChecker, async (req, res) => {
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
    const total = await User.countDocuments({
      ...query,
    });
    const active = await User.countDocuments({
      ...query,
      status: "active",
    });
    const inactive = await User.countDocuments({
      ...query,
      status: "inactive",
    });
    res.send({
      total,
      active,
      inactive,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", authChecker, async (req, res) => {
  const role = req.query.role;
  const status = req.query.status;
  try {
    const user = await User.findOne({ userId: req.params.id })
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
router.post("/one", authChecker, async (req, res) => {

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
    const user = await User.findOne(query)
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
router.get("/id/:id", authChecker, async (req, res) => {
  const role = req.query.role;
  try {
    const user = await User.findOne({ _id: req.params.id })
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


// assign lead to consultent

router.put("/assign", authChecker, async (req, res) => {
  const { users, consultant } = req.body;
  try {
    const result = await User.updateMany(
      { _id: { $in: users } },
      { "settings.consultant": consultant },
      { new: true }
    )
    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

})

router.put("/assign-gl", authChecker, async (req, res) => {
  const { users, consultant } = req.body;
  try {
    const result = await User.updateMany(
      { _id: { $in: users } },
      { "settings.gl": consultant },
      { new: true }
    )
    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

})
router.put("/assign-trainer", authChecker, async (req, res) => {
  const { users, consultant } = req.body;
  try {
    const result = await User.updateMany(
      { _id: { $in: users } },
      { "settings.trainer": consultant },
      { new: true }
    )
    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

})
router.post("/current-user", authChecker, async (req, res) => {
  const userId = req.user.email;
  try {
    const user = await User.findOne({
      $or: [{ phone: userId }, { email: userId }, { whatsapp: userId }],
    })
      .select(userIgnoreFeilds)
      .populate("course")
      .exec();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.cookie("ThisisToken", "This is my token");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post("/register", async (req, res) => {
  const data = req.body;
  try {
    const settings = await getSetting();
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

    let reference;
    if (data.reference) {
      reference = await User.findOne({
        userId: data.reference,
        status: "active",
      });
    }

    if (!reference && data.reference) {
      return res.status(404).json({ message: "Invalid Reference" });
    }

    const lastUser = await User.findOne().select({ userId: 1 }).sort({ _id: -1 }).exec();
    const userId = Number(lastUser.userId) + 1;

    const newUser = new User({
      ...data,
      password: hashedPassword,
      userId,
      "settings.sgl": reference && reference.settings.sgl ? reference.settings.sgl : "",
      "settings.gl": reference && reference.settings.gl ? reference.settings.gl : "",
      "settings.trainer": reference && reference.settings.trainer ? reference.settings.trainer : "",
    });

    const savedUser = await newUser.save();
    if (!savedUser) {
      return res.status(500).json({ message: "Failed to save user" });
    }

    if (reference) {
      const newRefer = new Refer({
        user: savedUser._id,
        referer: reference._id,
      });

      await newRefer.save();

      await User.findByIdAndUpdate(reference._id, {
        $inc: {
          balance: settings.refer_bonus,
        },
      });
      await assignCradit({
        amount: settings.refer_bonus,
        source: "Lead Generation cradit",
        userId: savedUser.userId,
        user: reference._id,
      });
    }
    // await User.deleteOne({ userId: savedUser.userId })
    res.send(savedUser);
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
        { expiresIn: "2h" }
      );
      res.cookie(TOKEN_NAME.ACCESS, accessToken, REFRESH_TOKEN_COOKIE_OPTIONS);
      res.send({
        message: "Login successful",
        accessToken: accessToken,
        role: user.role,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/update/:id", authChecker, async (req, res) => {
  try {
    const user = await User.updateOne(
      { _id: req.params.id },
      req.body,
      { new: true },
      { upsert: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.put("/active/:id", authChecker, async (req, res) => {
  try {
    const settings = await getSetting();
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await User.findOneAndUpdate(
      { _id: req.params.id },
      { ...req.body, due: settings.due, "settings.gl": "", "settings.trainer": "", },
      { new: true }
    );

    if (user.reference.length > 2) {
      const referer = await User.findOne({ userId: user.reference })
      await User.updateOne({ userId: referer.userId }, {
        $inc: {
          balance: settings.active_bonus,
        },
        ref_limit: 30
      })
      // update refer limit of referer

      // assigning passbook for referer
      await assignCradit({
        amount: settings.active_bonus,
        source: "Activation bonus for User",
        userId: user.userId,
        user: referer._id
      })

      if (user.settings.consultant) {
        await User.updateOne({ userId: user.settings.consultant }, {
          $inc: {
            balance: settings.counsultant_bonus,
          },
        })
        // assigning passbook for consultant
        await assignCradit({
          amount: settings.counsultant_bonus,
          source: "Active cradit for counselor",
          userId: user.userId,
          user: user.settings.consultant
        })
      }
      if (referer.settings.gl) {
        await User.updateOne({ userId: referer.settings.gl }, {
          $inc: {
            balance: settings.gl_bonus,
          },
        })
        // assigning passbook for group leader
        await assignCradit({
          amount: settings.gl_bonus,
          source: "active cradit for Team leader",
          userId: user.userId,
          user: referer.settings.gl
        })
      }

      if (referer.settings.trainer) {
        await User.updateOne({ userId: referer.settings.trainer }, {
          $inc: {
            balance: settings.trainer_bonus,
          },
        })
        // assigning passbook for trainer
        await assignCradit({
          amount: settings.trainer_bonus,
          source: "active cradit for trainer",
          userId: user.userId,
          user: referer.settings.trainer
        })
      }
    }
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get refer history 

router.get("/refer-history/:id", authChecker, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 30;
  const skipIndex = (page - 1) * limit;
  const status = req.query.status;

  try {
    const refer = await User.find({
      reference: req.params.id,
    })
      .select(userIgnoreFeilds)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skipIndex)
      .exec();
    const total = await User.countDocuments({ reference: req.params.id })
    const active = await User.countDocuments({
      reference: req.params.id,
      status: "active",
    })
    const inactive = await User.countDocuments({
      reference: req.params.id,
      status: "inactive",
    })

    if (status) {
      const finalFilter = await User.countDocuments({
        reference: req.params.id,
        status: status,
      })
      res.status(200).json({ count: total, active, inactive, data: finalFilter.slice(skipIndex, skipIndex + limit) });
    }
    else {
      res.status(200).json({ count: total, active, inactive, data: refer.slice(skipIndex, skipIndex + limit) });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
})

router.put("/many", authChecker, async (req, res) => {
  const { data, ids } = req.body
  try {
    const user = await User.updateMany(
      { _id: { $in: ids } },
      req.body,
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Update Password
router.put("/pass", authChecker, async (req, res) => {
  try {
    const { password, newPassword, rePassword } = req.body;
    const user = await User.findOne({
      $or: [{ phone: req.user.phone }, { email: req.user.email }],
    });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Old Password does not match" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(user._id, {
      password: hashedPassword,
    });
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Change Password
router.put("/update-password/:id", async (req, res) => {
  try {
    const { password } = req.body;
    const user = await User.findOne({
      email: req.params.id
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(user._id, {
      password: hashedPassword,
    });
    await Code.updateOne({ user: user._id }, { code: "" })
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Setting

router.get("/setting/:name", authChecker, async (req, res) => {
  try {
    const setting = await Setting.findById("65f545aec4314a97fa9b4343");
    if (!setting) {
      return res.status(404).json({ message: "Setting not found" });
    }
    res.status(200).json(setting);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})
router.put("/setting/:name", authChecker, async (req, res) => {
  try {
    const setting = await Setting.updateOne({ _id: "65f545aec4314a97fa9b4343" }, req.body, { new: true });
    if (!setting) {
      return res.status(404).json({ message: "Setting not found" });
    }
    res.status(200).json(setting);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})
router.put("/add-banner", authChecker, async (req, res) => {
  try {
    const setting = await Setting.updateOne({ _id: "65f545aec4314a97fa9b4343" },
      {
        $push: { banners: req.body }
      }
      , { new: true });
    if (!setting) {
      return res.status(404).json({ message: "Setting not found" });
    }
    res.status(200).json({ message: "Banner added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})
router.put("/remove-banner", authChecker, async (req, res) => {
  try {
    const setting = await Setting.updateOne({ _id: "65f545aec4314a97fa9b4343" },
      {
        $pull: { banners: req.body }
      }
      , { new: true });
    if (!setting) {
      return res.status(404).json({ message: "Setting not found" });
    }
    res.status(200).json({ message: "Banner added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})
router.post("/setting", authChecker, async (req, res) => {
  try {
    const setting = new Setting(req.body);
    await setting.save();
    res.status(200).json({ message: "Setting created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})
router.put("/due", authChecker, async (req, res) => {
  try {
    const userId = req.body.user;
    const isExist = await User.findById(userId);
    if (!isExist) {
      return res.status(404).json({ message: "Wallet not found" });
    }
    if (isExist.balance < isExist.due) {
      return res.status(400).json({ message: "Insufficient balance" });
    }
    await User.updateOne(
      { _id: userId },
      { due: 0, balance: isExist.balance - isExist.due },
      { new: true }
    );
    res.status(200).json({ message: "Wallet updated successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", authChecker, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

router.put('/balance', authChecker, async (req, res) => {
  try {
    const user = await User.findById(req.body.user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await User.findOneAndUpdate(
      user._id,
      { $inc: { balance: req.body.amount } }, // Corrected balance update
      { new: true }
    );
    res.status(200).json({ message: "Balance updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

router.patch('/forget/:id', async (req, res) => {
  const userId = req.params.id
  try {
    const user = await User.findOne({
      $or: [{ phone: userId }, { email: userId }],
    })
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
    const findCode = await Code.findOne({ user: user._id })
    const password = Math.random().toString(36).slice(-8);
    if (!findCode) {
      const newCOde = new Code({ user: user._id, code: password })
      await newCOde.save()
    }
    else {
      const result = await Code.updateOne({ user: user._id }, {
        code: password
      })
    }
    await passwordResetMail(user?.email, password)
    res.status(200).json({ message: "Password Reset Mail sent successfully Check your Mail", email: user.email })
  } catch (error) {

  }
})

router.post('/verify-code', async (req, res) => {

  const { code, user } = req.body
  try {
    const isExist = await User.findOne({
      $or: [{ phone: user }, { email: user }]
    })
    const findCode = await Code.findOne({ user: isExist._id, code })
    if (!isExist) {
      return res.status(404).json({ message: "User not found" })
    }
    if (!findCode) {
      return res.status(404).json({ message: "Code not found" })
    }
    res.status(200).json({ message: "Code verified successfully" })
  } catch (error) {

  }
})

module.exports = router;
