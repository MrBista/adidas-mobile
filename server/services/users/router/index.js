const express = require('express');
const Controller = require('../controller/Controller');
const router = express.Router();

router.post('/users/register', Controller.register);
router.post('/users/login', Controller.login);
router.get('/users', Controller.allUsers);
router.get('/users/:id', Controller.exactUser);
router.delete('/users/:id', Controller.deleteUser);

module.exports = router;
