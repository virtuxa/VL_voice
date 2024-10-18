// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401); // Если токен отсутствует

    jwt.verify(token, config.jwtSecret, (err, user) => {
        if (err) return res.sendStatus(403); // Токен недействителен

        req.user = user; // Сохраняем данные о пользователе в запросе
        next(); // Передаем управление следующему middleware
    });
};

module.exports = (req, res, next) => {
    if (req.session.isAuthenticated) {
        next();
    } else {
        res.redirect('/login');
    }
};