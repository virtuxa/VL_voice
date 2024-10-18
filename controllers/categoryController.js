// controllers/categoryController.js
const Category = require('../models/categoryModel');
const Channel = require('../models/channelModel');

exports.createCategory = async (req, res) => {
    try {
        const { serverId, name } = req.body;

        // Проверим, существует ли сервер
        const server = await Server.findByPk(serverId);
        if (!server) {
            return res.status(404).json({ message: 'Сервер не найден' });
        }

        // Создание категории
        const category = await Category.create({ name, serverId });
        res.status(201).json({ message: 'Категория создана', category });
    } catch (error) {
        console.error('Ошибка создания категории:', error);
        res.status(500).json({ message: 'Ошибка создания категории', error: error.message });
    }
};

exports.getCategoriesWithChannels = async (req, res) => {
    try {
        const { serverId } = req.params;

        const categories = await Category.findAll({
            where: { serverId },
            include: {
                model: Channel,
                as: 'channels'
            }
        });

        res.status(200).json(categories);
    } catch (error) {
        console.error('Ошибка получения категорий и каналов:', error);
        res.status(500).json({ message: 'Ошибка получения категорий и каналов', error: error.message });
    }
};