const { Router } = require('express');
const { check } = require('express-validator');
const { isAdmin } = require('../middlewares/jwtChecker');
const AdminController = require('../controllers/AdminController');
const router = Router();

// PRODUCTS
router.get('/product-get/:id', AdminController.product.GetById);
router.get('/product-get-list', AdminController.product.GetList);
router.get('/product-get-hits', AdminController.product.GetHits);
router.get('/product-get-novelty', AdminController.product.GetNovelty);
router.post('/product-get-by-filter', AdminController.product.GetByFilter);
router.post('/:token/product-upload-description-images', isAdmin, AdminController.product.UploadDescriptionImage);
router.post('/:token/product-remove-description-image', isAdmin, AdminController.product.RemoveDescriptionImage);
router.post('/:token/product-upload-main-image', isAdmin, AdminController.product.UploadMainImage);
router.post('/:token/product-remove-main-image', isAdmin, AdminController.product.RemoveMainImage);
router.post('/:token/product-create',
    [
        check('mainImageSrc', 'Некорректная ссылка на изображение товара').isURL(),
        check('title', 'Некорректное название товара').isLength({ min: 5, max: 100 }),
        check('description', 'Описание товара должно состоять минимум из 100 символов').isLength({ min: 100 }),
        check('price', 'Некорректная цена товара').custom((value) => {
            if (+value <= 0) throw new Error('Цена должна быть больше 0');
            else return value;
        }),
        check('discount', 'Некорректная скидка').custom((value) => {
            if (+value < 0) throw new Error('Скидка на товар не может быть отрицательной');
            else return value;
        }),
        check('weight', 'Некорректный вес товара').custom((value) => {
            if (+value < 0) throw new Error('Вес не может быть отрицательным');
            else return value;
        })
    ],
    isAdmin, AdminController.product.Create
)

// BRANDS
router.get('/brand-get-list', AdminController.brand.GetList);
router.post('/:token/brand-upload-image', isAdmin, AdminController.brand.UploadImage);
router.post('/:token/brand-remove-image', isAdmin, AdminController.brand.RemoveImage);
router.post('/:token/brand-create', isAdmin, AdminController.brand.Create);
router.post('/:token/brand-delete/:id', isAdmin, AdminController.brand.Delete)

// TYPES
router.get('/:token/type-get-list', isAdmin, AdminController.type.GetList)
router.post('/:token/type-create', isAdmin, AdminController.type.Create);
router.post('/:token/type-delete/:id', isAdmin, AdminController.type.Delete);

// ORDERS
router.get('/:token/order-get-list', isAdmin, AdminController.order.GetList);

module.exports = router;
