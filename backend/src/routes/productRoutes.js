const express = require("express");
const { createProduct, getAllProducts, getProductById, updateProduct } = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/multer");

const router = express.Router();

router.post("/", protect, upload.single("image"), createProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", protect, upload.single("image"), updateProduct);

module.exports = router;