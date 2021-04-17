const UserController = require('../controllers/UserController');
const { Router } = require('express');
const router = Router();


router.get('/getdata', UserController.getData);

module.exports = router;