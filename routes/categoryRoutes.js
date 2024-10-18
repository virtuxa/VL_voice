// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const authenticateToken = require('../middlewares/authMiddleware');

// Маршруты
router.post('/create', authenticateToken, categoryController.createCategory);
router.get('/:serverId', authenticateToken, categoryController.getCategoriesWithChannels); // Получение всех категорий

module.exports = router;
