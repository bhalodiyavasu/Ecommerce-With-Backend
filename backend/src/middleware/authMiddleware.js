const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ status: "FAILURE", message: "Not authorized, no token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) {
      res.cookie("token", "", {
        httpOnly: true,
        maxAge: 0,
      });
      return res.status(401).json({ status: "FAILURE", message: "User not found or deleted" });
    }

    next();
  } catch (error) {
    res.status(401).json({ status: "FAILURE", message: "Not authorized, invalid token" });
  }
};

module.exports = { protect };