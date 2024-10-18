// routes/registerRoutes.js
const express = require('express');
const router = express.Router();

// Обработка формы регистрации
router.post('/', (req, res) => {
    const { username, password } = req.body;
    // Логика регистрации (добавление пользователя в базу данных)
    // Если успешно, перенаправить на /login
    res.redirect('/login');
});

module.exports = router;
