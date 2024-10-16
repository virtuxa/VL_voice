// models/serverModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const User = require('./userModel');  // Импортируем модель пользователя для связи

const Server = sequelize.define('Server', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User, // Связываем с таблицей пользователей
            key: 'id'
        }
    }
}, {
    timestamps: true
});

module.exports = Server;
