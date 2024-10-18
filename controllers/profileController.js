// controllers/profileController.js
const Profile = require('../models/profileModel');

exports.getProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const profile = await Profile.findOne({ where: { userId } });
        if (!profile) {
            return res.status(404).json({ message: 'Профиль не найден' });
        }
        res.status(200).json(profile);
    } catch (error) {
        console.error('Ошибка получения профиля:', error);
        res.status(500).json({ message: 'Ошибка получения профиля', error: error.message });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { avatarUrl, status } = req.body;

        const profile = await Profile.findOne({ where: { userId } });
        if (!profile) {
            return res.status(404).json({ message: 'Профиль не найден' });
        }

        profile.avatarUrl = avatarUrl ?? profile.avatarUrl;
        profile.status = status ?? profile.status;
        await profile.save();

        res.status(200).json({ message: 'Профиль обновлен', profile });
    } catch (error) {
        console.error('Ошибка обновления профиля:', error);
        res.status(500).json({ message: 'Ошибка обновления профиля', error: error.message });
    }
};
