// models/userRoleModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const User = require('./userModel');
const Role = require('./roleModel');

const UserRole = sequelize.define('UserRole', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Role,
            key: 'id'
        }
    }
}, {
    timestamps: true
});

module.exports = UserRole;
