// controllers/notificationController.js
const Notification = require('../models/notificationModel');

exports.getNotifications = async (req, res) => {
    try {
        const userId = req.user.id;
        const notifications = await Notification.findAll({ where: { userId, read: false } });
        res.status(200).json(notifications);
    } catch (error) {
        console.error('Ошибка получения уведомлений:', error);
        res.status(500).json({ message: 'Ошибка получения уведомлений' });
    }
};

exports.markAsRead = async (req, res) => {
    try {
        const notificationId = req.params.id;
        const notification = await Notification.findByPk(notificationId);
        if (!notification || notification.userId !== req.user.id) {
            return res.status(404).json({ message: 'Уведомление не найдено' });
        }
        notification.read = true;
        await notification.save();
        res.status(200).json({ message: 'Уведомление прочитано' });
    } catch (error) {
        console.error('Ошибка изменения уведомления:', error);
        res.status(500).json({ message: 'Ошибка изменения уведомления' });
    }
};
