const axios = require('axios');
const express = require('express');
const routeUsers = require('./users');
const ControllerUser = require('../controller/user');
const ControllerProduct = require('../controller/controller');

const router = express.Router();
router.use(routeUsers);
router.get('/products', ControllerProduct.getProducts);
router.get('/products/:id', ControllerProduct.getDetailProduct);
// admin
router.post('/products', ControllerProduct.addProduct);
router.put('/products/:id', ControllerProduct.editProduct);
router.delete('/products/:id', ControllerProduct.deleteProduct);
module.exports = router;
