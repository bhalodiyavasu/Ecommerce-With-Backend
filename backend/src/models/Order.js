const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
        size: { type: String, required: true },
        color: {
          name: { type: String, required: true },
          hex: { type: String, required: true },
        },
      },
    ],
    contactInfo: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true },
    },
    shippingInfo: {
      country: { type: String, required: true },
      state: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      address: { type: String, required: true },
    },
    subtotal: {
      type: Number,
      required: true,
    },
    shippingCharge: {
      type: Number,
      default: 0,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
    paymentStatus: {
      type: String,
      enum: ["Unpaid", "Paid"],
      default: "Unpaid",
    },
    stripeSessionId: {
      type: String,
    },
    orderNumber: {
      type: String,
      unique: true,
    },
    paymentId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);