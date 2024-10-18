// controllers/channelController.js
const Channel = require('../models/channelModel');
const Server = require('../models/serverModel');
const Permission = require('../models/permissionsModel');
const ServerMember = require('../models/serverMemberModel');
const Notification = require('../models/notificationModel');  // Импорт модели уведомлений
const logController = require('./logController');  // Импорт лог-контроллера

exports.createChannel = async (req, res) => {
    try {
        const { serverId, name, type, categoryId } = req.body;
        const userId = req.user.id;

        // Найдём сервер
        const server = await Server.findByPk(serverId);
        if (!server) {
            return res.status(404).json({ message: 'Сервер не найден' });
        }

        // Проверим, состоит ли пользователь на сервере
        const member = await ServerMember.findOne({ where: { serverId, userId } });
        if (!member) {
            return res.status(403).json({ message: 'Вы не являетесь участником сервера' });
        }

        // Проверим права пользователя (если это не создатель)
        if (server.ownerId !== userId) {
            const permission = await Permission.findOne({ where: { roleId: member.roleId } });
            if (!permission || !permission.canCreateChannel) {
                return res.status(403).json({ message: 'У вас нет прав на создание каналов' });
            }
        }

        // Проверка наличия имени в запросе
        if (!name) {
            return res.status(400).json({ message: 'Название канала обязательно' });
        }

        // Создание канала с возможностью привязки к категории
        const newChannel = await Channel.create({
            name,
            type,
            serverId,
            categoryId: categoryId || null
        });

        // Создадим уведомление для всех участников сервера
        const members = await ServerMember.findAll({ where: { serverId } });
        for (const member of members) {
            await Notification.create({
                message: `Новый канал ${name} был создан`,
                userId: member.userId
            });
        }

        // Логирование действия
        await logController.createLog('create_channel', `Создан канал ${name}`, serverId, userId);

        // Отправляем ответ только после завершения всех операций
        res.status(201).json({ message: 'Канал успешно создан', channel: newChannel });
    } catch (error) {
        console.error('Ошибка создания канала:', error);
        res.status(500).json({ message: 'Ошибка создания канала', error: error.message });
    }
};

exports.deleteChannel = async (req, res) => {
    try {
        const { channelId } = req.params;
        const userId = req.user.id;

        // Найдём канал
        const channel = await Channel.findByPk(channelId);
        if (!channel) {
            return res.status(404).json({ message: 'Канал не найден' });
        }

        // Найдём сервер, к которому принадлежит канал
        const server = await Server.findByPk(channel.serverId);
        if (!server) {
            return res.status(404).json({ message: 'Сервер не найден' });
        }

        // Проверим, что пользователь является создателем сервера или имеет право удалять каналы
        if (server.ownerId !== userId) {
            const member = await ServerMember.findOne({ where: { serverId: server.id, userId } });
            if (!member) {
                return res.status(403).json({ message: 'Вы не являетесь участником сервера' });
            }

            const permission = await Permission.findOne({ where: { roleId: member.roleId } });
            if (!permission || !permission.canDeleteChannel) {
                return res.status(403).json({ message: 'У вас нет прав на удаление каналов' });
            }
        }

        // Удалим канал
        await channel.destroy();
        res.status(200).json({ message: 'Канал успешно удалён' });
    } catch (error) {
        console.error('Ошибка удаления канала:', error);
        res.status(500).json({ message: 'Ошибка удаления канала', error: error.message });
    }
};