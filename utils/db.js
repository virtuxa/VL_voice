const { Sequelize } = require('sequelize');
const config = require('../config/config');

const sequelize = new Sequelize(
    config.db.database,
    config.db.user,
    config.db.password,
    {
        host: config.db.host,
        dialect: 'postgres',
        port: config.db.port,
        logging: false,  // Отключаем логирование SQL-запросов
    }
);

sequelize.authenticate()
    .catch(err => console.error('Ошибка подключения к базе данных:', err));

module.exports = sequelize;
