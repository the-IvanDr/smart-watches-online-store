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
            return res.status(200).json({
                success: true,
                message: 'Пользователь успешно зарегистрирован'
            });
        } else {
            return res.status(400).json({
                success: false,
                message: 'Такой e-mail уже зарегистрирован'
            });
        }
        
    } catch (error) {
        return res.json({ errors: [error] });
    }

}

exports.loginUser = function (req, res) {
    console.log('loginUser: ', req.body);


    return res.json({ message: 'loginUser!! FROM SERVER!!!' });
}