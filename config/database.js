const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,     // Имя базы данных
  process.env.DB_USER,     // Пользователь
  process.env.DB_PASS,     // Пароль
  {
    host: process.env.DB_HOST, // Хост базы данных
    dialect: 'postgres',       // Тип базы данных
  }
);

module.exports = sequelize;
