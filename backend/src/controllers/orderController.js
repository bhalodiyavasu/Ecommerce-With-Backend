const Order = require("../models/Order");

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.status(200).json({ status: "SUCCESS", count: orders.length, orders });
  } catch (error) {
    res.status(500).json({ status: "FAILURE", message: error.message });
  }
};

module.exports = { getMyOrders };