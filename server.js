const express = require('express');
const { Pool } = require('pg');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

// Обслуживание статических файлов из папки static
app.use(express.static(path.join(__dirname, 'static')));

// Подключаем .env
require('dotenv').config();
const port = process.env.PORT;

// -------------------------------------------------------

// Настройка подключения к базе данных
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Проверка подключения
pool.connect((err, client, release) => {
    if (err) {
        return console.error('Ошибка подключения к базе данных:', err.stack);
    }
    console.log('Успешное подключение к базе данных');
});

// -------------------------------------------------------

// Обработка форм

// -------------------------------------------------------

// Адресация для /home
app.get(['/home'], (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'server.html'));
});

// Адресация для /login
app.get(['/login'], (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'login.html'));
});

// Адресация для /register
app.get(['/register'], (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'register.html'));
});

// -------------------------------------------------------

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
