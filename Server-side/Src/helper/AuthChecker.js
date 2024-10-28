const jwt = require("jsonwebtoken");
const User = require("../modules/user/user.model");

const authChecker = async (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ phone: decoded.phone }).exec();
    if (!user) {
      return res.status(401).send("Invalid Token");
    }
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};
const adminChecker = async (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ phone: decoded.phone }).exec();
    if (!user) {
      return res.status(401).send("Invalid Token");
    }
    if (user.role !== "admin") {
      return res.status(401).send("You don't have access to this route");
    }
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = { authChecker, adminChecker };
