// app.js
const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const authMiddleware = require('./middlewares/authMiddleware');

const authRoutes = require('./routes/authRoutes');
const serverRoutes = require('./routes/serverRoutes');
const roleRoutes = require('./routes/roleRoutes');
const channelRoutes = require('./routes/channelRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const inviteRoutes = require('./routes/inviteRoutes');
const permissionRoutes = require('./routes/permissionsRoutes');
const logRoutes = require('./routes/logRoutes');
const messageRoutes = require('./routes/messageRoutes');
const voiceRoutes = require('./routes/voiceRoutes');
const profileRoutes = require('./routes/profileRoutes');
const directMessageRoutes = require('./routes/directMessageRoutes');
const config = require('./config/config');

app.use(express.json());

// Подключение маршрутов
app.use('/auth', authRoutes);
app.use('/servers', serverRoutes);
app.use('/roles', roleRoutes);
app.use('/channels', channelRoutes);
app.use('/categories', categoryRoutes);
app.use('/notifications', notificationRoutes);  // Маршрут для уведомлений
app.use('/invites', inviteRoutes);  // Маршрут для приглашений
app.use('/permissions', permissionRoutes);  // Маршрут для прав
app.use('/logs', logRoutes);  // Маршрут для логов
app.use('/messages', messageRoutes);  // Маршрут для текстовых сообщений
app.use('/voice', voiceRoutes);  // Маршрут для голосовых каналов
app.use('/profile', profileRoutes);  // Маршрут для профилей пользователей
app.use('/direct-messages', directMessageRoutes);  // Маршрут для приватных сообщений

// Настройка сессии для авторизации
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false
}));

// Обработка данных формы
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Подключение статических файлов
app.use(express.static(path.join(__dirname, 'public')));

// Маршруты для регистрации и входа
app.use('/login', require('./routes/loginRoutes'));
app.use('/register', require('./routes/registerRoutes'));

// Маршруты для защищённых страниц
app.use('/home', authMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, 'public/home.html'));
});

// Обработка ошибок 404
app.use((req, res) => {
    res.status(404).send('Страница не найдена');
});

module.exports = app;