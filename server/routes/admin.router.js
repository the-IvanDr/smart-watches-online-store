const { Router } = require('express');
const { check } = require('express-validator');
const { isAdmin } = require('../middlewares/jwtChecker');
const AdminController = require('../controllers/AdminController');
const router = Router();

router.post('/:token/product-upload-description-images', isAdmin, AdminController.product.UploadDescriptionImage);
router.post('/:token/product-remove-description-image', isAdmin, AdminController.product.RemoveDescriptionImage);
router.post('/:token/product-upload-main-image', isAdmin, AdminController.product.UploadMainImage);
router.post('/:token/product-remove-main-image', isAdmin, AdminController.product.RemoveMainImage);

module.exports = router;
