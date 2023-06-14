const express = require('express');
const CategoryAdmin = require('../controllers/categoryAdmin');
const CategoryUser = require('../controllers/categoryUser');
const ControllerProductAdmin = require('../controllers/productAdmin');
const ControllerProductUser = require('../controllers/productUser');
const { authentication } = require('../middlewares/auth');
const routes = express.Router();

routes.get('/pub', ControllerProductUser.getAllProduct);
routes.get('/pub/:id', ControllerProductUser.getProductById);
routes.get('/pub/categories', CategoryUser.getAllCategory);
// route for get all product admin
routes.get('/categories', CategoryAdmin.getAllCategory);
routes.post('/categories', CategoryAdmin.addCategory);
routes.delete('/categories/:id', CategoryAdmin.deleteCategory);
routes.get('/categories/:id', CategoryAdmin.getCategoryById);
routes.put('/categories/:id', CategoryAdmin.editCategory);

routes.get('/', ControllerProductAdmin.getAllProduct);
routes.post('/', ControllerProductAdmin.addProduct);
routes.get('/:id', ControllerProductAdmin.getProductById);
routes.put('/:productId', ControllerProductAdmin.editProduct);
routes.delete('/:productId', ControllerProductAdmin.deleteProduct);
module.exports = routes;
