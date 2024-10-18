// controllers/messageController.js
const Message = require('../models/messageModel');

exports.sendMessage = async (req, res) => {
    try {
        const { content, channelId } = req.body;
        const userId = req.user.id;

        const message = await Message.create({ content, userId, channelId });
        res.status(201).json({ message: 'Сообщение отправлено', message });
    } catch (error) {
        console.error('Ошибка отправки сообщения:', error);
        res.status(500).json({ message: 'Ошибка отправки сообщения', error: error.message });
    }
};

exports.getMessages = async (req, res) => {
    try {
        const { channelId } = req.params;
        const messages = await Message.findAll({ where: { channelId } });
        res.status(200).json(messages);
    } catch (error) {
        console.error('Ошибка получения сообщений:', error);
        res.status(500).json({ message: 'Ошибка получения сообщений', error: error.message });
    }
};
