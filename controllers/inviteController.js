// controllers/inviteController.js
const Invite = require('../models/inviteModel');
const { v4: uuidv4 } = require('uuid');

// Создание приглашения
exports.createInvite = async (req, res) => {
    try {
        const { serverId } = req.body;
        const inviterId = req.user.id;

        // Генерация уникального токена для приглашения
        const token = uuidv4();

        // Создание записи приглашения в базе данных
        const invite = await Invite.create({
            token,
            serverId,
            inviterId
        });

        res.status(201).json({ message: 'Приглашение создано', invite });
    } catch (error) {
        console.error('Ошибка создания приглашения:', error);
        res.status(500).json({ message: 'Ошибка создания приглашения', error: error.message });
    }
};
