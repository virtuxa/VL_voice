// app.js
const express = require('express');
const authRoutes = require('./routes/authRoutes');
const serverRoutes = require('./routes/serverRoutes');
const roleRoutes = require('./routes/roleRoutes');
const channelRoutes = require('./routes/channelRoutes');
const config = require('./config/config');

const app = express();

app.use(express.json());

// Подключение маршрутов
app.use('/auth', authRoutes);  // Подключаем маршруты для авторизации
app.use('/servers', serverRoutes);  // Подключаем маршруты для серверов
app.use('/roles', roleRoutes);  // Подключаем маршруты для ролей
app.use('/channels', channelRoutes);  // Подключаем маршруты для каналов

module.exports = app;
