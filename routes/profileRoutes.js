// routes/profileRoutes.js
const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const authenticateToken = require('../middlewares/authMiddleware');

// Получение профиля
router.get('/', authenticateToken, profileController.getProfile);

// Обновление профиля
router.patch('/update', authenticateToken, profileController.updateProfile);

module.exports = router;
