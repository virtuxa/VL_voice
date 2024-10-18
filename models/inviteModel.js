// models/inviteModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const Server = require('./serverModel');
const User = require('./userModel');

const Invite = sequelize.define('Invite', {
    token: {
        type: DataTypes.STRING,
        allowNull: false
    },
    serverId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Server,
            key: 'id'
        }
    },
    inviterId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    }
}, {
    timestamps: true
});

module.exports = Invite;
