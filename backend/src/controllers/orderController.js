const Order = require("../models/Order");
const Cart = require("../models/Cart");

const calculateShipping = (subtotal) => {
  if (subtotal < 200) return 80;
  if (subtotal < 500) return 40;
  if (subtotal < 800) return 20;
  return 0;
};

const createOrder = async (req, res) => {
  try {
    const { contactInfo, shippingInfo } = req.body;

    if (!contactInfo || !shippingInfo) {
      return res.status(400).json({ status: "FAILURE", message: "All fields are required" });
    }

    const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ status: "FAILURE", message: "Cart is empty" });
    }

    const subtotal = cart.items.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);

    const shippingCharge = calculateShipping(subtotal);
    const totalAmount = subtotal + shippingCharge;

    const order = await Order.create({
      user: req.user._id,
      items: cart.items.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
      })),
      contactInfo,
      shippingInfo,
      subtotal,
      shippingCharge,
      totalAmount,
    });

    res.status(201).json({ status: "SUCCESS", message: "Order placed successfully", order });
  } catch (error) {
    res.status(500).json({ status: "FAILURE", message: error.message });
  }
};

module.exports = { createOrder };