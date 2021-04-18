require('dotenv').config();
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SALT = 12;

const { User } = require('../models/models');

exports.getAccessToCreateAdmin = async function (_, res) {
    try {
        const user = await User.findOne({
            where: { role: "ADMIN" }
        });

        if (user) res.json({ access: false });
        else res.json({ access: true });

    } catch (error) {
        console.error("AuthController.getAccessToCreateAdmin(): ", erorr.message);
        res.status(500).json({ error: error.message });
    }
}