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
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Регистрация пользователя
app.post('/register', async (req, res) => {
    const { email, username, displayName, password, day, month, year } = req.body;
    const dateOfBirth = `${year}-${month}-${day}`; // Форматируем дату рождения
  
    try {
      const result = await pool.query(
        'INSERT INTO users (email, username, display_name, password, date_of_birth) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [email, username, displayName, password, dateOfBirth]
      );
      res.redirect('/login'); // После успешной регистрации перенаправляем на страницу входа
    } catch (err) {
      console.error(err);
      res.send('Ошибка регистрации');
    }
  });
  
  // Авторизация пользователя
  app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const result = await pool.query(
        'SELECT * FROM users WHERE email = $1 AND password = $2',
        [email, password]
      );
  
      if (result.rows.length > 0) {
        res.redirect('/home');
      } else {
        res.send('Неправильный e-mail или пароль');
      }
    } catch (err) {
      console.error(err);
      res.send('Ошибка входа');
    }
  });

// -------------------------------------------------------

// Адресация для /home
app.get(['/home'], (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'home.html'));
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
