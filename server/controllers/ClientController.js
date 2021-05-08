const { validationResult } = require('express-validator');
const { Op } = require('sequelize');
const { User, Brand, Type, Product, ProductDetails, Feedback, Basket } = require('../models/models');


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


exports.cart = {
    add: async (req, res) => {
        try {
            const { productId } = req.body;
            const { userId } = req.body.jwtDecoded;

            const product = await Product.findOne({ where: { id: productId } });
            if (!product) throw new Error('Пользователь не найден');

            const [cart, created] = await Basket.findOrCreate({
                where: {
                    productId: product.id,
                    userId: userId
                },
                defaults: {
                    amount: 1,
                    total_price: product.price
                }
            });

            if (created) res.json({ success: true, cart });
            else res.json({ success: false, message: 'В корзине уже есть этот товар', cart });


        } catch (error) {
            console.log("Error: ", error.message);
            res.status(500).json({ error: error.message });
        }
    },

    get: async function (req, res) {
        try {
            console.log('req.body', req.body);
            const { userId } = req.body.jwtDecoded;

            const cart = await Basket.findAll({ where: { userId } });
            if (cart.length < 0) return res.json({ success: false, cart, message: 'Корзина пользователя пуста' });



            const products = await Product.findAll({
                where: {
                    id: {
                        [Op.or]: cart.map(item => item.productId)
                    }
                }
            });

            const prodList = products.map(item => item.dataValues);
            const cartList = cart.map(item => item.dataValues);

            const data = cartList.map(cartItem => {
                const prod = prodList.find(prodItem => prodItem.id === cartItem.productId);

                cartItem.product = prod;
                delete cartItem.productId;

                return cartItem;
            });

            res.json({ success: true, data });

        } catch (error) {
            console.log("Error: ", error.message);
            res.status(500).json({ error: error.message });
        }
    },

    setAmount: async function (req, res) {
        try {

            const { cartId, value } = req.params;

            const basket = await Basket.findOne({ where: { id: cartId } });
            const product = await Product.findOne({ where: { id: basket.productId } });
            await Basket.update(
                {
                    amount: value > 0 ? value : 1,
                    total_price: value > 0 ? product.price * value : product.price
                },
                {
                    where: { id: cartId }
                }
            );

            res.json({ message: 'setAmount' });

        } catch (error) {
            console.log("Error: ", error.message);
            res.status(500).json({ error: error.message });
        }
    },

    delete: async (req, res) => {
        try {
            const { cartId } = req.params;

            await Basket.destroy({ where: { id: cartId } });

            res.json({ message: 'Товар удален из корзины' });

        } catch (error) {
            console.log("Error: ", error.message);
            res.status(500).json({ error: error.message });
        }
    }
}