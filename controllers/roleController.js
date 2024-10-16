// controllers/roleController.js
const ServerMember = require('../models/serverMemberModel');
const Role = require('../models/roleModel');
const Server = require('../models/serverModel');
const UserRole = require('../models/userRoleModel');

exports.createRole = async (req, res) => {
    try {
        const { serverId, name, permissions } = req.body;
        const userId = req.user.id;

        // Проверим, что сервер существует
        const server = await Server.findByPk(serverId);
        if (!server) {
            return res.status(404).json({ message: 'Сервер не найден' });
        }

        // Проверим, что пользователь является создателем сервера
        if (server.ownerId !== userId) {
            return res.status(403).json({ message: 'Только создатель сервера может создавать роли' });
        }

        // Создаём новую роль
        const newRole = await Role.create({
            name,
            permissions,
            serverId: server.id
        });

        res.status(201).json({ message: 'Роль успешно создана', role: newRole });
    } catch (error) {
        console.error('Ошибка создания роли:', error);
        res.status(500).json({ message: 'Ошибка создания роли', error: error.message });
    }
};

exports.assignRole = async (req, res) => {
    try {
        const { serverId, roleId, userId } = req.body;
        const currentUserId = req.user.id;

        // Проверим, что сервер существует
        const server = await Server.findByPk(serverId);
        if (!server) {
            return res.status(404).json({ message: 'Сервер не найден' });
        }

        // Проверим, что пользователь является создателем сервера
        if (server.ownerId !== currentUserId) {
            return res.status(403).json({ message: 'Только создатель сервера может назначать роли' });
        }

        // Проверим, что участник состоит на сервере
        const member = await ServerMember.findOne({ where: { serverId, userId } });
        if (!member) {
            return res.status(404).json({ message: 'Пользователь не является участником сервера' });
        }

        // Назначаем роль
        await UserRole.create({
            userId,
            roleId
        });

        res.status(200).json({ message: 'Роль успешно назначена' });
    } catch (error) {
        console.error('Ошибка назначения роли:', error);
        res.status(500).json({ message: 'Ошибка назначения роли', error: error.message });
    }
};

exports.deleteRole = async (req, res) => {
    try {
        const { roleId } = req.params;
        const userId = req.user.id;

        // Найдём роль
        const role = await Role.findByPk(roleId);
        if (!role) {
            return res.status(404).json({ message: 'Роль не найдена' });
        }

        // Найдём сервер, к которому принадлежит роль
        const server = await Server.findByPk(role.serverId);
        if (!server) {
            return res.status(404).json({ message: 'Сервер не найден' });
        }

        // Проверим, что пользователь является создателем сервера
        if (server.ownerId !== userId) {
            return res.status(403).json({ message: 'Только создатель сервера может удалять роли' });
        }

        // Удаляем все связи пользователей с этой ролью в таблице UserRoles
        await UserRole.destroy({ where: { roleId: role.id } });

        // Удалим саму роль
        await role.destroy();
        res.status(200).json({ message: 'Роль успешно удалена' });
    } catch (error) {
        console.error('Ошибка удаления роли:', error);
        res.status(500).json({ message: 'Ошибка удаления роли', error: error.message });
    }
};