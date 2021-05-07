const { validationResult } = require('express-validator');
const { User, Brand, Type, Product, ProductDetails, Feedback } = require('../models/models');


exports.feedback = {
    getByProductId: async (req, res) => {
        try {
            const { productId } = req.params;

            const feedbacks = await Feedback.findAll({ where: { productId } });

            res.json({ feedbacks });

        } catch (error) {
            console.log("Error: ", error.message);
            res.status(500).json({ error: error.message });
        }
    },

    create: async (req, res) => {
        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log('errors.array(): ', errors.array());

                return res.status(200).json({
                    errors: errors.array().map(error => error.msg),
                    message: "Некорректные данные"
                });
            }

            console.log('req.body', req.body);

            const data = req.body;
            const authData = req.body.jwtDecoded;

            const user = await User.findOne({ where: { id: authData.userId } });
            if (!user) throw new Error('Пользователь не найден в базе данных');

            const [feedback, created] = await Feedback.findOrCreate({
                where: {
                    rate: data.rate,
                    text: data.message,
                    user_name: data.name,
                    user_email: data.email,
                    productId: data.productId,
                    userId: authData.userId,
                }
            });

            if (created) res.json({ message: 'Отзыв успешно создан', success: true });
            else res.json({ message: 'Такой отзыв уже есть', success: false });        

        } catch (error) {
            console.log("Error: ", error.message);
            res.status(500).json({ error: error.message });
        }
    },
}