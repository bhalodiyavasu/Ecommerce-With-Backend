// const express = require('express');
// const { registerUser, loginUser } = require('../controllers/authController');

// const router = express.Router();
// router.post("/register", registerUser)
// router.post("/login", loginUser)

// module.exports = router;

const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected route — test mate
router.get("/me", protect, (req, res) => {
  res.status(200).json({
    status: "SUCCESS",
    user: req.user,
  });
});

module.exports = router;