const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const config = require('../config/config');
const Profile = require('../models/profileModel');

// Регистрация пользователя
exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        // Создание пользователя
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        });

        // Создание профиля для пользователя
        await Profile.create({
            userId: newUser.id,
            bio: '',  // Биография по умолчанию пустая
            avatar: '',  // Изображение по умолчанию
        });

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка регистрации', error });
    }
};

// Авторизация пользователя
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ message: 'Пользователь не найден' });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: 'Неверный пароль' });

        const token = jwt.sign({ id: user.id }, config.jwtSecret, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка авторизации', error });
    }
};
