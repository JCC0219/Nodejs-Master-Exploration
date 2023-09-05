const express = require("express");
const productsController = require("../controllers/admin");
const Router = express.Router();
const { body } = require("express-validator");
const isAuth = require("../middleware/is-auth");

// /admin/add-product => GET
// request will pass from left to right ( it will first go is auth and then only go to controller)
Router.get("/add-product", isAuth, productsController.getAddProduct);

// /admin/products => GET
Router.get("/products", isAuth, productsController.getProducts);

// /admin/add-product => POST
Router.post(
  "/add-product",
  [
    body("title").isString().isLength({ min: 3 }).trim(),
    body("price").isFloat(),
    body("description").isLength({ min: 5, max: 400 }).trim(),
  ],
  isAuth,
  productsController.postAddProduct
);

Router.get(
  "/edit-product/:productId",
  isAuth,
  productsController.getEditProduct
);

Router.post(
  "/edit-product",
  [
    body("title").isString().isLength({ min: 3 }).trim(),
    body("price").isFloat(),
    body("description").isLength({ min: 5, max: 400 }).trim(),
  ],
  isAuth,
  productsController.postEditProduct
);

Router.post("/delete-product", isAuth, productsController.postDeleteProduct);

module.exports = Router;
