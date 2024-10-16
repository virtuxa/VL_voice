// routes/serverRoutes.js
const express = require('express');
const router = express.Router();
const serverController = require('../controllers/serverController');
const authenticateToken = require('../middlewares/authMiddleware');  // Middleware для проверки авторизации

// Маршрут для создания сервера
router.post('/create', authenticateToken, serverController.createServer);

// Маршрут для удаления сервера
router.delete('/delete/:id', authenticateToken, serverController.deleteServer);

// Маршрут для вступления в сервер
router.post('/join', authenticateToken, serverController.joinServer);

// Маршрут для выхода из сервера
router.post('/leave', authenticateToken, serverController.leaveServer);

module.exports = router;