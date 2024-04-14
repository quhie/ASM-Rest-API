var express = require('express');
var router = express.Router();

const UserController = require('../controller/UserController');

router.get('/', UserController.getAllUsers);

router.post('/register', UserController.registerUser);

router.post('/login', UserController.loginUser);

router.put('/:id', UserController.updateUser);

router.get('/phone/:phone', UserController.getUserByPhone);

router.post('/delete', UserController.deleteUser);

module.exports = router;
