// controllers/voiceController.js
const Channel = require('../models/channelModel');

exports.joinVoiceChannel = async (req, res) => {
    try {
        const { channelId } = req.params;
        const userId = req.user.id;

        // Найдем канал
        const channel = await Channel.findByPk(channelId);
        if (!channel || channel.type !== 'voice') {
            return res.status(404).json({ message: 'Голосовой канал не найден' });
        }

        // Логика подключения к голосовой комнате
        res.status(200).json({ message: 'Подключен к голосовому каналу', channel });
    } catch (error) {
        console.error('Ошибка подключения к голосовому каналу:', error);
        res.status(500).json({ message: 'Ошибка подключения к голосовому каналу', error: error.message });
    }
};
