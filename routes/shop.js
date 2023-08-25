const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const Router = express.Router();

Router.get('/', shopController.getIndex);

Router.get('/products', shopController.getProducts);

Router.get('/products/:productId', shopController.getProduct);

Router.get('/cart', shopController.getCart);

Router.post('/cart', shopController.postCart);

Router.post('/cart-delete-item', shopController.postCartDeleteProduct);

Router.get('/orders', shopController.getOrders);

Router.get('/checkout', shopController.getCheckout);

module.exports = Router;
