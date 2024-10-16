// routes/channelRoutes.js
const express = require('express');
const router = express.Router();
const channelController = require('../controllers/channelController');
const authenticateToken = require('../middlewares/authMiddleware');

// Маршруты каналов
router.post('/create', authenticateToken, channelController.createChannel);
router.delete('/delete/:channelId', authenticateToken, channelController.deleteChannel);

module.exports = router;