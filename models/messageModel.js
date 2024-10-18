// models/messageModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const User = require('./userModel');
const Channel = require('./channelModel');

const Message = sequelize.define('Message', {
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    channelId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Channel,
            key: 'id',
            onDelete: 'CASCADE'
        }
    }
}, {
    timestamps: true
});

module.exports = Message;
