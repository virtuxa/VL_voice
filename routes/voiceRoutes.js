// routes/voiceRoutes.js
const express = require('express');
const router = express.Router();
const voiceController = require('../controllers/voiceController');
const authenticateToken = require('../middlewares/authMiddleware');

// Подключение к голосовому каналу
router.post('/join/:channelId', authenticateToken, voiceController.joinVoiceChannel);

module.exports = router;
