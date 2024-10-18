// controllers/directMessageController.js
const DirectMessage = require('../models/directMessageModel');
const { Op } = require('sequelize');

exports.sendDirectMessage = async (req, res) => {
    try {
        const { content, receiverId } = req.body;
        const senderId = req.user.id;

        // Проверим, существует ли получатель
        const receiver = await User.findByPk(receiverId);
        if (!receiver) {
            return res.status(404).json({ message: 'Получатель не найден' });
        }

        const message = await DirectMessage.create({ content, senderId, receiverId });
        res.status(201).json({ message: 'Сообщение отправлено', message });
    } catch (error) {
        console.error('Ошибка отправки сообщения:', error);
        res.status(500).json({ message: 'Ошибка отправки сообщения', error: error.message });
    }
};

exports.getDirectMessages = async (req, res) => {
    try {
        const userId = req.user.id;  // Текущий пользователь (отправитель)
        const { otherUserId } = req.params;  // Получаем otherUserId из параметров URL

        if (!otherUserId) {
            return res.status(400).json({ message: 'otherUserId не передан в запросе' });
        }

        // Получение всех сообщений между пользователями
        const messages = await DirectMessage.findAll({
            where: {
                [Op.or]: [
                    { senderId: userId, receiverId: otherUserId },
                    { senderId: otherUserId, receiverId: userId }
                ]
            },
            order: [['createdAt', 'ASC']]  // Сортировка по времени создания
        });

        res.status(200).json({ messages });
    } catch (error) {
        console.error('Ошибка получения сообщений:', error);
        res.status(500).json({ message: 'Ошибка получения сообщений', error: error.message });
    }
};
