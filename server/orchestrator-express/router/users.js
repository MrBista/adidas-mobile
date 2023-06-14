const express = require('express');
const ControllerUser = require('../controller/user');
const router = express.Router();
router.post('/users', ControllerUser.register);
router.get('/users', ControllerUser.getUsers);
router.get('/users/:id', ControllerUser.exactUser);
router.delete('/users/:id', ControllerUser.deleteUser);
module.exports = router;
