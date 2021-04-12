const { validationResult } = require('express-validator');

exports.registerUser = function (req, res) {
    console.log('registerUser:', req.body);
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
            message: "Некорректные регистрационные данные"
        });
    }

    return res.json({ message: 'registerUser... From SERVER!!!' });
}