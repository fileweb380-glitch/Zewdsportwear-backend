const express = require('express');
const router = express.Router();
const { loginAdmin, getMe, logoutAdmin } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/login', loginAdmin);
router.get('/me', protect, getMe);
router.post('/logout', protect, logoutAdmin);

module.exports = router;
