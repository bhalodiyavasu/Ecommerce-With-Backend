const express = require("express");
const { createProduct } = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/multer");

const router = express.Router();

router.post("/", protect, upload.single("image"), createProduct);

module.exports = router;