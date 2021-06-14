// Підключення модуля 'sequelize'
const { Sequelize } = require('sequelize');

// Створення екземпляру класу Sequelize з налаштуваннями, та його експорт
module.exports = new Sequelize(
    process.env.DB_NAME, // Назва бази даних "timeshop_db"
    process.env.DB_USER, // Ім'я користувача "TimeShop"
    process.env.DB_PASSWORD, // Пароль "root"
    {
        host: process.env.DB_HOST, // хост "localhost"
        port: process.env.DB_PORT, // порт 3306
        dialect: 'mysql' // діалект SQL "MySQL"
    }
);