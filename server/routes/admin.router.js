const { Router } = require('express');
const { check } = require('express-validator');
const AdminController = require('../controllers/AdminController');
const router = Router();

router.get('/accesstocreateadmin', AdminController.getAccessToCreateAdmin);

module.exports = router;