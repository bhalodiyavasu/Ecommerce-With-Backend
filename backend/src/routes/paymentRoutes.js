const express = require("express");
const { createCheckoutSession, stripeWebhook, verifySession } = require("../controllers/paymentController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create-checkout-session", protect, createCheckoutSession);
router.post("/webhook", stripeWebhook);
router.get("/verify-session/:sessionId", protect, verifySession);

module.exports = router;
