require('dotenv').config(); // модуль доступу до змінних середовища
const jwt = require('jsonwebtoken'); // модуль jwt
const { User } = require('../models/models'); // модель користувача

// Модуль перевірки токену
exports.jwtChecker = function (req, res, next) {
    try {
        // визначення токену із параметра запиту
        const { token } = req.params; 
        
        // дешифрування та перевірка токену за допомогою секретного ключа
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 

        // якщо токен дійсний, продовжити виконання запиту та додати у тіло запиту дані взяті з токену
        req.body = { ...req.body, jwtDecoded: decoded };
        next();

    } catch (error) {
        // у випадку помилки (якщо токен не дійсний) вивести повідомлення у консоль
        // та повернути клієнту повідомлення про не дійсність токену
        console.log("JWT_ERROR: ", error.message);
        res.json({ jwtError: error.message });
    }
}

// Перевірка токену та наявності ролі "Адміністратор"
exports.isAdmin = async function (req, res, next) {
    try {

        // Визначення токену з параметрів запиту
        const { token } = req.params;

        // Розшифрування та перевірка токену
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Додання до тіла запиту даних з токену
        req.body = { ...req.body, jwtDecoded: decoded };

        // Знайти користувача в БД за його id, взятого з токену
        const user = await User.findOne({ where: { id: decoded.userId } });
        
        // Якщо роль користувача не "ADMIN", викинути помилку з повідомленням
        if(user.role !== 'ADMIN') throw new Error('You are not and admin...');

        next();

    } catch (error) {

        // В разі помилки, вивести її у консоль та повернути клієнту
        console.log("JWT_ERROR: ", error.message);
        res.status(403).json({ jwtError: error.message });
    }
}