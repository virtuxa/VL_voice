const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Обслуживание статических файлов из папки static
app.use(express.static(path.join(__dirname, 'static')));

// 
app.get(['/home'], (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'server.html'));
});

// 
app.get(['/login'], (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'login.html'));
});
app.get(['/register'], (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'register.html'));
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
