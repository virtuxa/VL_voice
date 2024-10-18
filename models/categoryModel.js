// models/categoryModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const Server = require('./serverModel');
const Channel = require('./channelModel');

const Category = sequelize.define('Category', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
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

// Настроим связь "один ко многим" между Category и Channel
Category.hasMany(Channel, { foreignKey: 'categoryId', as: 'channels' });
Channel.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

module.exports = Category;
