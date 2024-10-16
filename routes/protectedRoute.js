// routes/protectedRoute.js
const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authMiddleware');

router.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'Это защищённый маршрут!', user: req.user });
});

module.exports = router;
