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
        type: DataTypes.ENUM('text', 'voice'),
        defaultValue: 'text'
    },
    serverId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Server,
            key: 'id',
            onDelete: 'CASCADE'
        }
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Categories',
            key: 'id',
            onDelete: 'SET NULL'
        }
    }
}, {
    timestamps: true
});

module.exports = Channel;
