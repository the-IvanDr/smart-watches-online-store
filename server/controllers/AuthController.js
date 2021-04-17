require('dotenv').config();
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SALT = 12;

const { User } = require('../models/models');


exports.registerUser = async function (req, res) {
    try {
        console.log('registerUser:', req.body);

        // Request body validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {

            console.log('errors.array(): ', errors.erray());

            return res.status(400).json({
                errors: errors.array(),
                message: "Некорректные регистрационные данные"
            });
        }


        const { fName, lName, mName, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, SALT);

        // Find Or Create user
        const [user, created] = await User.findOrCreate({
            where: { email },
            defaults: {
                f_name: fName, l_name: lName, m_name: mName,
                password: hashedPassword,
                email
            }
        });


        // If user was found in the DB, return the error message
        if (created) {

            // Create JWT for the created user
            const token = jwt.sign(
                { userId: user.id, userRole: user.role },
                process.env.JWT_SECRET,
                { expiresIn: "1 d" }
            );

            return res.status(200).json({
                success: true,
                message: 'Пользователь успешно зарегистрирован',
                userData: {
                    fName: user.f_name,
                    lName: user.l_name,
                    mName: user.m_name,
                    email: user.email,
                    role: user.role
                },
                token
            });

        } else {
            return res.status(400).json({
                success: false,
                message: 'Такой e-mail уже зарегистрирован'
            });
        }

    } catch (error) {

        console.log("ERROR:", error);
        return res.json({ error: error.message });
    }

}

exports.loginUser = async function (req, res) {
    try {
        console.log('loginUser:', req.body);

        // Request body validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {

            console.log('errors.array(): ', errors.erray());

            return res.status(400).json({
                errors: errors.array(),
                message: "Некорректные данные"
            });
        }


        const { email, password } = req.body;

        // Try to find the user by email
        const user = await User.findOne({ where: { email } });

        // If user not found, return error message
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Неверный email или пароль!'
            });
        }


        // Compare passwords
        const isMatch = bcrypt.compare(user.password, password);

        // If passwords missmatch, return error message
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Неверный email или пароль!"
            });
        }


        // If everything is ok, sign JWT token for user
        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET,
            { expiresIn: "1 d" }
        );

        return res.json({
            success: true,
            message: "Пользователь успешно авторизован",
            userData: {
                fName: user.f_name,
                lName: user.l_name,
                mName: user.m_name,
                email: user.email,
                role: user.role
            },
            token
        });





    } catch (error) {
        console.log("ERROR:", error);
        return res.json({ error: error.message });
    }
}