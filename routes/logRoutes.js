// routes/logRoutes.js
const express = require('express');
const router = express.Router();
const logController = require('../controllers/logController');
const authenticateToken = require('../middlewares/authMiddleware');

// Получение логов для сервера
router.get('/:serverId', authenticateToken, logController.getLogs);

module.exports = router;
