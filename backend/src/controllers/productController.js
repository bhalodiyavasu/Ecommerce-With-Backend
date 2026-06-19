const Product = require("../models/Product");
const cloudinary = require("../config/cloudinary");

const createProduct = async (req, res) => {
  try {
    const { name, price, category, gender, status, description, sizes, colors } = req.body;

    if (!name || !price || !category || !gender || !status || !description) {
      return res.status(400).json({ status: "FAILURE", message: "All fields are required" });
    }

    if (!req.file) {
      return res.status(400).json({ status: "FAILURE", message: "Product image is required" });
    }

    const result = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
      {
        folder: "eternix/products",
        format: "webp",
        quality: "auto",
      }
    );

    // Step 4 — DB ma save karo
    const product = await Product.create({
      name,
      price,
      category,
      gender,
      status,
      description,
      sizes: JSON.parse(sizes),
      colors: JSON.parse(colors),
      image: result.secure_url,
    });

    res.status(201).json({
      status: "SUCCESS",
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({ status: "FAILURE", message: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      status: "SUCCESS",
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({ status: "FAILURE", message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ status: "FAILURE", message: "Product not found" });
    }

    res.status(200).json({
      status: "SUCCESS",
      product,
    });
  } catch (error) {
    res.status(500).json({ status: "FAILURE", message: error.message });
  }
};

module.exports = { createProduct, getAllProducts, getProductById };