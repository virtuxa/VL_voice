// controllers/permissionsController.js
const Permission = require('../models/permissionsModel');

exports.updatePermissions = async (req, res) => {
    try {
        const { roleId } = req.params;
        const { canCreateChannel, canEditChannel, canDeleteChannel } = req.body;

        // Найдём права по роли
        const permission = await Permission.findOne({ where: { roleId } });
        if (!permission) {
            return res.status(404).json({ message: 'Роль не найдена' });
        }

        // Обновим права
        permission.canCreateChannel = canCreateChannel;
        permission.canEditChannel = canEditChannel;
        permission.canDeleteChannel = canDeleteChannel;
        await permission.save();

        res.status(200).json({ message: 'Права успешно обновлены', permission });
    } catch (error) {
        console.error('Ошибка обновления прав:', error);
        res.status(500).json({ message: 'Ошибка обновления прав', error: error.message });
    }
};
