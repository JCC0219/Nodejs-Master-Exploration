const express = require("express");
const path = require("path");
const productsController = require("../controllers/admin");
const Router = express.Router();


// /admin/add-product => GET
Router.get("/add-product",productsController.getAddProduct);

// /admin/products => GET
Router.get('/products',productsController.getProducts);

// /admin/add-product => POST
Router.post("/add-product", productsController.postAddProduct);

Router.get("/edit-product/:productId",productsController.getEditProduct);

Router.post('/edit-product',productsController.postEditProduct);

Router.post('/delete-product',productsController.postDeleteProduct)


module.exports = Router
