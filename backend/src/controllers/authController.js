const { getAuth } = require("../config/firebaseAdmin");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const { sendWelcomeEmail } = require("../utils/emailService");

const googleAuth = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ status: "FAILURE", message: "idToken is required" });
    }

    const decoded = await getAuth().verifyIdToken(idToken);
    const { uid, email, name, picture } = decoded;

    let user = await User.findOne({ email });

    if (user) {
      if (!user.googleId) {
        user.googleId = uid;
        user.avatar = picture || user.avatar;
        await user.save();
      }
    } else {
      user = await User.create({
        username: name || email.split("@")[0],
        email,
        googleId: uid,
        avatar: picture || "",
      });

      sendWelcomeEmail(user.email, user.username)
        .then(() => console.log("Welcome email sent to:", user.email))
        .catch((err) => console.error("Welcome email failed:", err.message));
    }

    const token = generateToken(res, user._id);

    res.status(200).json({
      status: "SUCCESS",
      message: "Logged in successfully",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    res.status(401).json({ status: "FAILURE", message: "Invalid Google token" });
  }
};

const logoutUser = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    maxAge: 0,
  });

  res.status(200).json({
    status: "SUCCESS",
    message: "Logged out successfully",
  });
};

module.exports = { googleAuth, logoutUser };
