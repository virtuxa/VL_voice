// routes/messageRoutes.js
const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const authenticateToken = require('../middlewares/authMiddleware');

// Отправка сообщения
router.post('/send', authenticateToken, messageController.sendMessage);

// Получение сообщений из канала
router.get('/:channelId', authenticateToken, messageController.getMessages);

module.exports = router;
