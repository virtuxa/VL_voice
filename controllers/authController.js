const User = require('../models/User');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const { validationResult } = require('express-validator');

// Настройка хранилища для аватарок
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Показать форму регистрации
exports.showRegister = (req, res) => {
    res.render('register', { errors: [] });
  };

// Обработка регистрации
exports.register = [
  upload.single('avatar'),
  async (req, res) => {
    const { username, password, email, displayName, phoneNumber } = req.body;
    const avatar = req.file ? req.file.filename : null;

    // Проверка на ошибки валидации
    const errors = [];
    if (!username || !password || !email) {
      errors.push({ msg: 'Пожалуйста, заполните все обязательные поля' });
    }

    if (errors.length > 0) {
      return res.render('register', { errors });
    }

    try {
      // Проверка, существует ли пользователь
      const userExists = await User.findOne({ where: { username } });
      if (userExists) {
        errors.push({ msg: 'Имя пользователя уже занято' });
        return res.render('register', { errors });
      }

      const emailExists = await User.findOne({ where: { email } });
      if (emailExists) {
        errors.push({ msg: 'Почта уже используется' });
        return res.render('register', { errors });
      }

      // Хеширование пароля
      const hashedPassword = await bcrypt.hash(password, 10);

      // Создание пользователя
      await User.create({
        username,
        password: hashedPassword,
        email,
        displayName,
        phoneNumber,
        avatar,
      });

      req.session.success_msg = 'Вы успешно зарегистрировались! Теперь вы можете войти.';
      res.redirect('/login');
    } catch (error) {
      console.error(error);
      errors.push({ msg: 'Ошибка при регистрации: ' + error.message });
      res.render('register', { errors });
    }
  },
];

// Показать форму входа
exports.showLogin = (req, res) => {
    res.render('login', { errors: [] });
};

// Обработка входа
exports.login = async (req, res) => {
  const { username, password } = req.body;
  const errors = [];

  if (!username || !password) {
    errors.push({ msg: 'Пожалуйста, заполните все поля' });
    return res.render('login', { errors });
  }

  try {
    // Поиск пользователя
    const user = await User.findOne({ where: { username } });
    if (!user) {
      errors.push({ msg: 'Неверное имя пользователя или пароль' });
      return res.render('login', { errors });
    }

    // Проверка пароля
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      errors.push({ msg: 'Неверное имя пользователя или пароль' });
      return res.render('login', { errors });
    }

    // Создание сессии пользователя
    req.session.user = {
      id: user.id,
      username: user.username,
      displayName: user.displayName,
      email: user.email,
      avatar: user.avatar,
    };

    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    errors.push({ msg: 'Ошибка при входе: ' + error.message });
    res.render('login', { errors });
  }
};

// Выход из системы
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};

// Показать панель пользователя
exports.dashboard = (req, res) => {
    if (!req.session.user) {
      return res.redirect('/login');
    }
    res.render('dashboard');
};