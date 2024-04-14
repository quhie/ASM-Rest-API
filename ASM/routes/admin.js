var express = require('express');
var router = express.Router();

const AdminController = require('../controller/AdminController');

router.post('/login', AdminController.loginAdmin);
router.post('/change-password', AdminController.changePassword);

module.exports = router;
