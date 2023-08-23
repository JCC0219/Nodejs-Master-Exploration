const express = require("express");
const path = require("path");
const productsController = require("../controllers/products");
const Router = express.Router();


// /admin/add-product => GET
Router.get("/add-product",productsController.getAddProduct);

// /admin/add-product => POST
Router.post("/add-product", productsController.postAddProduct);

module.exports = Router
