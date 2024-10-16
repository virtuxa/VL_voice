// models/serverMemberModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const User = require('./userModel');
const Server = require('./serverModel');

const ServerMember = sequelize.define('ServerMember', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    serverId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Server,
            key: 'id',
            onDelete: 'CASCADE'  // Каскадное удаление
        }
    }
}, {
    timestamps: true
});

module.exports = ServerMember;