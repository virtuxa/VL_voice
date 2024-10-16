// models/channelModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const Server = require('./serverModel');

const Channel = sequelize.define('Channel', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM('text', 'voice'),  // Текстовый и голосовой типы каналов
        defaultValue: 'text'
    },
    serverId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Server,
            key: 'id',
            onDelete: 'CASCADE'  // Каскадное удаление при удалении сервера
        }
    }
}, {
    timestamps: true
});

module.exports = Channel;
