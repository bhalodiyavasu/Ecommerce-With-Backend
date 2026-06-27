const express = require("express");
const { getMyOrders, downloadReceipt, downloadReceiptBySession } = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/my-orders", protect, getMyOrders);
router.get("/receipt-by-session/:sessionId", downloadReceiptBySession);
router.get("/:orderId/receipt", protect, downloadReceipt);

module.exports = router;