const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Обслуживание статических файлов из папки static
app.use(express.static(path.join(__dirname, 'static')));

// Для всех маршрутов загружаем server.html
app.get(['/home', '/login', '/register'], (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'server.html'));
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
