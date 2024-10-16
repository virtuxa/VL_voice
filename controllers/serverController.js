// controllers/serverController.js
const Server = require('../models/serverModel');
const ServerMember = require('../models/serverMemberModel');

exports.createServer = async (req, res) => {
    try {
        const { name, description } = req.body;

        // Проверяем, что пользователь авторизован
        const ownerId = req.user.id;

        // Создаём новый сервер
        const newServer = await Server.create({
            name,
            description,
            ownerId
        });

        // Автоматически добавляем владельца в качестве участника
        await ServerMember.create({
            userId: ownerId,
            serverId: newServer.id
        });

        res.status(201).json({
            message: 'Сервер успешно создан, вы автоматически добавлены как участник',
            server: newServer
        });
    } catch (error) {
        console.error('Ошибка создания сервера:', error);
        res.status(500).json({ message: 'Ошибка создания сервера', error: error.message });
    }
};

exports.deleteServer = async (req, res) => {
    try {
        const serverId = req.params.id;
        const userId = req.user.id;

        // Найдём сервер
        const server = await Server.findOne({ where: { id: serverId } });

        if (!server) {
            return res.status(404).json({ message: 'Сервер не найден' });
        }

        // Проверим, что пользователь является создателем сервера
        if (server.ownerId !== userId) {
            return res.status(403).json({ message: 'Только создатель сервера может его удалить' });
        }

        // Удалим всех участников сервера
        await ServerMember.destroy({ where: { serverId } });

        // Удалим сервер
        await server.destroy();
        res.status(200).json({ message: 'Сервер успешно удалён' });
    } catch (error) {
        console.error('Ошибка удаления сервера:', error);
        res.status(500).json({ message: 'Ошибка удаления сервера', error: error.message });
    }
};

exports.joinServer = async (req, res) => {
    try {
        const { serverId } = req.body;
        const userId = req.user.id;

        // Проверим, что сервер существует
        const server = await Server.findByPk(serverId);
        if (!server) {
            return res.status(404).json({ message: 'Сервер не найден' });
        }

        // Проверим, состоит ли пользователь уже на сервере
        const existingMember = await ServerMember.findOne({ where: { serverId, userId } });
        if (existingMember) {
            return res.status(200).json({
                message: 'Вы уже являетесь участником этого сервера',
                server: server  // Возвращаем информацию о сервере
            });
        }

        // Добавляем пользователя на сервер
        await ServerMember.create({ userId, serverId });

        res.status(200).json({ message: 'Вы успешно присоединились к серверу' });
    } catch (error) {
        console.error('Ошибка присоединения к серверу:', error);
        res.status(500).json({ message: 'Ошибка присоединения к серверу', error: error.message });
    }
};

exports.leaveServer = async (req, res) => {
    try {
        const { serverId } = req.body;
        const userId = req.user.id;

        // Найдём пользователя на сервере
        const membership = await ServerMember.findOne({ where: { userId, serverId } });
        if (!membership) {
            return res.status(404).json({ message: 'Вы не состоите на этом сервере' });
        }

        // Удалим участника
        await membership.destroy();

        // Проверим, есть ли на сервере ещё участники
        const remainingMembers = await ServerMember.count({ where: { serverId } });
        if (remainingMembers === 0) {
            // Если участников не осталось, удалим сервер
            await Server.destroy({ where: { id: serverId } });
            return res.status(200).json({ message: 'Сервер был удалён, так как больше нет участников' });
        }

        res.status(200).json({ message: 'Вы успешно покинули сервер' });
    } catch (error) {
        console.error('Ошибка выхода из сервера:', error);
        res.status(500).json({ message: 'Ошибка выхода из сервера', error: error.message });
    }
};