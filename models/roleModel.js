// models/roleModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const Server = require('./serverModel');

const Role = sequelize.define('Role', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    permissions: {
        type: DataTypes.ARRAY(DataTypes.STRING),  // Массив прав
        allowNull: true,
        defaultValue: []  // По умолчанию без прав
    },
    serverId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Server,
            key: 'id',
            onDelete: 'CASCADE'
        }
    }
}, {
    timestamps: true
});

module.exports = Role;
