const { Router } = require('express');
const { check } = require('express-validator');
const AdminController = require('../controllers/AdminController');
const router = Router();

router.post('/product-create-set-description-images', AdminController.productCreateSetDescriptionImages);

module.exports = router;