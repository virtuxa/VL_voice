const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

// Настройка body-parser для обработки данных из формы
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Настройка сессий (подключается до маршрутов)
app.use(session({
  secret: 'yourSecretKey',  // Замени на уникальный ключ
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }  // Если используешь HTTPS, установи secure: true
}));

// Обслуживание статических файлов из папки static
app.use(express.static(path.join(__dirname, 'static')));

// Подключаем .env
require('dotenv').config();
const port = process.env.PORT;

// -------------------------------------------------------

const { Pool } = require('pg');
const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'VL_voice',
    password: process.env.DB_PASSWORD || '159',
    port: process.env.DB_PORT || 5432,
});

// Обертка для выполнения запросов
async function query(text, params) {
    const res = await pool.query(text, params);
    return res.rows; // Возвращаем только строки результатов
}



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
    const { username, password } = req.body;

    // Запрос к базе данных для поиска пользователя
    const result = await query('SELECT * FROM users WHERE username = $1', [username]);

    if (result.length === 0) {
        console.log('Пользователь не найден:', username);
        return res.redirect('/login');
    }

    const user = result[0]; // Получаем первого пользователя

    if (user.password === password) {
        // Успешная авторизация — сохраняем данные в сессии
        req.session.userId = user.id;
        console.log('Авторизация успешна, перенаправляем на главную страницу');
        return res.redirect('/');
    } else {
        console.log('Неправильное имя пользователя или пароль');
        return res.redirect('/login');
    }
});




// -------------------------------------------------------
const authMiddleware = require('./middlewares/authMiddleware');
// Адресация для /home
app.get(['/'], authMiddleware, (req, res) => {
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
