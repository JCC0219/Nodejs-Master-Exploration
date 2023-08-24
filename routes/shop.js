const express = require("express");
const path = require("path");
const Router = express.Router();

const shopController = require('../controllers/shop')

Router.get("/", shopController.getProducts);

Router.get('/products',shopController.getIndex);

Router.get('/products/:productId',shopController.getProduct);

Router.get('/cart',shopController.getCart);

Router.get('/orders',shopController.getOrders);

Router.get('/checkout',shopController.getCheckout);

module.exports = Router;
