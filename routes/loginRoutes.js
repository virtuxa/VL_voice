// routes/loginRoutes.js
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    const { username, password } = req.body;
    // Проверь правильность username и password
    if (username === 'test' && password === 'password') {
        req.session.isAuthenticated = true;
        req.session.username = username;
        res.redirect('/home');
    } else {
        res.redirect('/login');
    }
});

module.exports = router;
