const express = require('express');
const app = express();
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');
const session = require('express-session');
const path = require('path');
require('dotenv').config();

// Middleware для парсинга тела запросов
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Настройка сессий
app.use(
    session({
      secret: process.env.SECRET_KEY,
      resave: false,
      saveUninitialized: false,
    })
);

// Делаем req и user доступными в шаблонах
app.use((req, res, next) => {
    res.locals.req = req;
    res.locals.user = req.session.user;
    next();
});

// Статические файлы
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'public')));

// Настройка шаблонизатора EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Маршруты
app.use('/', authRoutes);

// Подключение к базе данных и запуск сервера
sequelize
  .sync()
  .then(() => {
    app.listen(3000, () => {
      console.log('Сервер запущен на порту 3000');
    });
  })
  .catch((err) => {
    console.error('Не удалось подключиться к базе данных:', err);
  });
