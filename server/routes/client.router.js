const { Router } = require('express');
const { check } = require('express-validator');
const { jwtChecker } = require('../middlewares/jwtChecker');
const ClientController = require('../controllers/ClientController');
const router = Router();

// FEEDBACK
router.get('/feedback/by-product-id/:productId', ClientController.feedback.getByProductId);
router.post(
    '/:token/feedback/create',
    [
        check('name', 'Некорректное имя пользователя').isLength({ min: 4, max: 100 }),
        check('email', 'Некорректный e-mail').isEmail(),
        check('rate', 'Рейтинг должен быть в промежутке от 1 до 5 включительно').custom((value) => {
            if (+value < 1) throw new Error('Рейтинг отзыва не может быть меньше 1');
            else if (+value > 5) throw new Error('Рейтинг отзыва не может быть больше 5');
            else return value;
        })
    ],
    jwtChecker,
    ClientController.feedback.create
);

// CART
router.post('/:token/cart/add/', jwtChecker, ClientController.cart.add);
router.get('/:token/cart/get', jwtChecker, ClientController.cart.get);
router.post('/:token/cart/:cartId/set-amount/:value', jwtChecker, ClientController.cart.setAmount);
router.post('/:token/cart/:cartId/delete', jwtChecker, ClientController.cart.delete)

// Orders
router.post('/:token/order/add', jwtChecker, ClientController.order.add);

module.exports = router;