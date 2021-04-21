require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require('../models/models');

exports.jwtChecker = function (req, res, next) {
    try {
        const { token } = req.params;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.body = { ...req.body, jwtDecoded: decoded };
        next();

    } catch (error) {
        console.log("JWT_ERROR: ", error.message);
        res.json({ jwtError: error.message });
    }
}

exports.isAdmin = async function (req, res, next) {
    try {
        const { token } = req.params;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body = { ...req.body, jwtDecoded: decoded };

        const user = await User.findOne({ where: { id: decoded.userId } });
        if(user.role !== 'ADMIN') throw new Error('You are not and admin...');

        next();

    } catch (error) {
        console.log("JWT_ERROR: ", error.message);
        res.status(403).json({ jwtError: error.message });
    }
}