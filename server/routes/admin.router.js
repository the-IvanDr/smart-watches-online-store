const { Router } = require('express');
const { check } = require('express-validator');
const { isAdmin } = require('../middlewares/jwtChecker');
const AdminController = require('../controllers/AdminController');
const router = Router();

router.post('/:token/product-upload-description-images', isAdmin, AdminController.productUploadDescriptionImages);
router.post('/:token/product-remove-description-image', isAdmin, AdminController.productRemoveDescriptionImage);

module.exports = router;
