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

// BRANDS
router.post('/:token/brand-upload-image', isAdmin, AdminController.brand.UploadImage);
router.post('/:token/brand-remove-image', isAdmin, AdminController.brand.RemoveImage);
router.post('/:token/brand-create', isAdmin, AdminController.brand.Create);

module.exports = router;
