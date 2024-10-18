// routes/directMessageRoutes.js
const express = require('express');
const router = express.Router();
const directMessageController = require('../controllers/directMessageController');
const authenticateToken = require('../middlewares/authMiddleware');

// Отправка сообщения
router.post('/send', authenticateToken, directMessageController.sendDirectMessage);

// Получение сообщений с другим пользователем
router.get('/:otherUserId', authenticateToken, directMessageController.getDirectMessages);

module.exports = router;
