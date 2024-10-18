// routes/permissionsRoutes.js
const express = require('express');
const router = express.Router();
const permissionsController = require('../controllers/permissionsController');
const authenticateToken = require('../middlewares/authMiddleware');

// Обновление прав роли
router.patch('/:roleId', authenticateToken, permissionsController.updatePermissions);

module.exports = router;
