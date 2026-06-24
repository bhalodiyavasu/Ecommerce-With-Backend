const User = require("../models/User");

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    res.status(200).json({ status: "SUCCESS", user });
  } catch (error) {
    res.status(500).json({ status: "FAILURE", message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { phone, shippingAddress } = req.body;

    const user = await User.findById(req.user._id);

    if (phone) user.phone = phone;

    if (shippingAddress) {
      user.shippingAddress = {
        address: shippingAddress.address || user.shippingAddress.address,
        country: shippingAddress.country || user.shippingAddress.country,
        state: shippingAddress.state || user.shippingAddress.state,
        city: shippingAddress.city || user.shippingAddress.city,
        postalCode: shippingAddress.postalCode || user.shippingAddress.postalCode,
      };
    }

    await user.save();

    res.status(200).json({ status: "SUCCESS", message: "Profile updated successfully", user });
  } catch (error) {
    res.status(500).json({ status: "FAILURE", message: error.message });
  }
};

module.exports = { getProfile, updateProfile };