const express = require("express");
const path = require("path");
const Router = express.Router();

const productsController = require('../controllers/products')

Router.get("/", productsController.getProducts);

module.exports = Router;
