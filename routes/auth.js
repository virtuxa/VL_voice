const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Регистрация
router.get('/register', authController.showRegister);
router.post('/register', authController.register);

// Вход
router.get('/login', authController.showLogin);
router.post('/login', authController.login);

// Выход
router.get('/logout', authController.logout);

// Панель пользователя
router.get('/dashboard', authController.dashboard);

module.exports = router;
