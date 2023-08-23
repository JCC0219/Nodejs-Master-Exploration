const express = require("express");
const path = require("path");
const Router = express.Router();
const rootDir = require("../util/path");
const adminData = require("./admin");

Router.get("/", (req, res, next) => {
  const products = adminData.products;

  ////using traditional HTML
  // res.sendFile(path.join(rootDir, "views", "shop.html"));

  res.render('shop', {
    prods: products,
    pageTitle: 'Shop',
    path: '/',
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true
  });
});

module.exports = Router;
