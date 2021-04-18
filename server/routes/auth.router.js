const { Router } = require('express');
const { check } = require('express-validator');
const AuthController = require('../controllers/AuthController');
const router = Router();

router.post(
    '/registration',
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Минимальная длина пароля 8 символов')
            .isLength({ min: 8, max: 100 })
            .custom((value, { req }) => {
                if (value !== req.body.confirmPassword) {
                    throw new Error("Пароли не совпадают");
                } else {
                    return value;
                }
            }),
        check('fName', 'Не корректные данные в поле "Имя"').isLength({ min: 2, max: 50 }),
        check('lName', 'Не корректные данные в поле "Фамилия"').isLength({ min: 2, max: 50 })
    ],
    AuthController.registerUser
);

router.post(
    '/login',
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Минимальная длина пароля 6 символов').isLength({ min: 8, max: 100 }),
    ],
    AuthController.loginUser
);

module.exports = router;