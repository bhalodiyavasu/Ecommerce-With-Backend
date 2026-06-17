const express = require("express");
const { createProduct, getAllProducts } = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/multer");

const router = express.Router();

router.post("/", protect, upload.single("image"), createProduct);
router.get("/", getAllProducts);

module.exports = router;