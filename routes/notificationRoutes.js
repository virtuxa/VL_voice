// routes/notificationRoutes.js
const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const authenticateToken = require('../middlewares/authMiddleware');

// Получение непрочитанных уведомлений
router.get('/', authenticateToken, notificationController.getNotifications);

// Отметка уведомления как прочитанного
router.patch('/:id/read', authenticateToken, notificationController.markAsRead);

module.exports = router;
