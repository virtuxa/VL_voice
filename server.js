// server.js
const app = require('./app');
const config = require('./config/config');
const sequelize = require('./utils/db');
const User = require('./models/userModel');
const Server = require('./models/serverModel');
const ServerMember = require('./models/serverMemberModel');

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Подключение к базе данных установлено');

        // Синхронизируем модели
        await sequelize.sync({ alter: true });
        console.log('Базы данных синхронизированы');

        app.listen(config.port, () => {
            console.log(`Сервер запущен на порту ${config.port}`);
        });
    } catch (error) {
        console.error('Ошибка при запуске сервера:', error);
    }
};

startServer();
