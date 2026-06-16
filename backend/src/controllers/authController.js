const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body

    if(!username || !email || !password) {
      return res.status(400).json({ status: "FAILURE", message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ status: "FAILURE", message: "Email already exist" });
    }

    const hashedPassword = await bcrypt.hash(String(password), 10);

    const user = await User.create({
      username,
      email, 
      password: hashedPassword,
    });

    res.status(201).json({
      status: "SUCCESS",
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ status: "FAILURE", message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const {email, password} = req.body;

    if(!email || !password) {
      return res.status(400).json({ status: "FAILURE", message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ status: "FAILURE", message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({status: "FAILURE", message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      sameSite: "strict",
    });

    res.status(200).json({
      status: "SUCCESS",
      message: "Login successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    })
  } catch (error) {
    res.status(500).json({ status: "FAILURE", message: error.message });
  }
};

module.exports = { registerUser, loginUser };