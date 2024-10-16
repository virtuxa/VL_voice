// routes/roleRoutes.js
const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');
const authenticateToken = require('../middlewares/authMiddleware');

// Маршрут для создания роли
router.post('/create', authenticateToken, roleController.createRole);
router.post('/assign', authenticateToken, roleController.assignRole);
router.delete('/delete/:roleId', authenticateToken, roleController.deleteRole);

module.exports = router;
