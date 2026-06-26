const express = require("express");
const { getMyOrders, downloadReceipt } = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/my-orders", protect, getMyOrders);
router.get("/:orderId/receipt", protect, downloadReceipt);

module.exports = router;