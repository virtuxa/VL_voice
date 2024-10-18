// routes/inviteRoutes.js
const express = require('express');
const router = express.Router();
const inviteController = require('../controllers/inviteController');
const authenticateToken = require('../middlewares/authMiddleware');

// Создание приглашения
router.post('/create', authenticateToken, inviteController.createInvite);

module.exports = router;
