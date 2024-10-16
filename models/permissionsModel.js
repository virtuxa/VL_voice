// models/permissionsModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const Role = require('./roleModel');

const Permission = sequelize.define('Permission', {
    canCreateChannel: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    canEditChannel: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    canDeleteChannel: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Role,
            key: 'id',
            onDelete: 'CASCADE'  // Каскадное удаление прав при удалении роли
        }
    }
}, {
    timestamps: true
});

module.exports = Permission;
