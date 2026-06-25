const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["tshirt", "shirt", "jacket", "shoes"],
    },
    gender: {
      type: String,
      required: true,
      enum: ["man", "woman", "kids"],
    },
    status: {
      type: String,
      required: false,
      enum: ["New In", "Best Seller"],
    },
    description: {
      type: String,
      required: true,
    },
    sizes: {
      type: [String],
      required: true,
    },
    colors: [
      {
        name: { type: String, required: true },
        hex: { type: String, required: true },
      },
    ],
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);