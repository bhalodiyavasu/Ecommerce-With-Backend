const express = require('express');
const { googleAuth, logoutUser } = require('../controllers/authController');

const router = express.Router();

router.post("/google", googleAuth);
router.post("/logout", logoutUser);

module.exports = router;