const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Маршрут для файла server.css
app.get('/server.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'server.css'));
});

// Обслуживание статических файлов из папки static
app.use(express.static(path.join(__dirname, 'static')));

// Отправка server.html при запросе к корню
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'server.html'));
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
