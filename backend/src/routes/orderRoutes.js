const express = require("express");
const { getMyOrders } = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/my-orders", protect, getMyOrders);

module.exports = router;