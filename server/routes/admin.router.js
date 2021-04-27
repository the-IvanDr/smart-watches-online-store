const { Router } = require('express');
const { check } = require('express-validator');
const { isAdmin } = require('../middlewares/jwtChecker');
const AdminController = require('../controllers/AdminController');
const router = Router();

// PRODUCTS
router.post('/:token/product-upload-description-images', isAdmin, AdminController.product.UploadDescriptionImage);
router.post('/:token/product-remove-description-image', isAdmin, AdminController.product.RemoveDescriptionImage);
router.post('/:token/product-upload-main-image', isAdmin, AdminController.product.UploadMainImage);
router.post('/:token/product-remove-main-image', isAdmin, AdminController.product.RemoveMainImage);
router.post('/:token/product-create', isAdmin, AdminController.product.Create)

// BRANDS
router.get('/:token/brand-get-list', isAdmin, AdminController.brand.GetList);
router.post('/:token/brand-upload-image', isAdmin, AdminController.brand.UploadImage);
router.post('/:token/brand-remove-image', isAdmin, AdminController.brand.RemoveImage);
router.post('/:token/brand-create', isAdmin, AdminController.brand.Create);
router.post('/:token/brand-delete/:id', isAdmin, AdminController.brand.Delete)

// TYPES
router.get('/:token/type-get-list', isAdmin, AdminController.type.GetList)
router.post('/:token/type-create', isAdmin, AdminController.type.Create);
router.post('/:token/type-delete/:id', isAdmin, AdminController.type.Delete);

module.exports = router;
