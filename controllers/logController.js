// controllers/logController.js
const Log = require('../models/logModel');

exports.createLog = async (action, description, serverId, userId = null) => {
    try {
        await Log.create({
            action,
            description,
            serverId,
            userId
        });
    } catch (error) {
        console.error('Ошибка создания лога:', error);
    }
};

exports.getLogs = async (req, res) => {
    try {
        const { serverId } = req.params;
        const logs = await Log.findAll({ where: { serverId } });
        res.status(200).json(logs);
    } catch (error) {
        console.error('Ошибка получения логов:', error);
        res.status(500).json({ message: 'Ошибка получения логов', error: error.message });
    }
};