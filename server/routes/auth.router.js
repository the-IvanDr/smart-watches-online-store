const { Router } = require('express');
const { check } = require('express-validator');
const bcrypt = require('bcrypt');
const salt = 12;

const AuthController = require('../controllers/AuthController');
const { User, Basket, Type, Brand, BrandType, Device, DeviceInfo } = require('../models/models');


const router = Router();

router.post(
    '/registration',
    [
        check('email', 'Некорректный email').isEmail(), // Проверка e-mail на корректность
        check('password', 'Минимальная длина пароля 6 символов').isLength({ min: 8, max: 100 }),
        check('fName', 'Не корректные данные в поле "Имя"').isLength({ min: 2, max: 50 }),
        check('lName', 'Не корректные данные в поле "Фамилия"').isLength({ min: 2, max: 50 })
    ],
    AuthController.registerUser
);



module.exports = router;