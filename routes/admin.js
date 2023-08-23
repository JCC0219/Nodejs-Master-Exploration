const express = require("express");
const path = require("path");

const Router = express.Router();

const products = [];

// /admin/add-product => GET
Router.get("/add-product", (req, res, next) => {
  ////using traditional HTML
  // res.sendFile(path.join(__dirname, "../", "views", "add-product.html")); //do not code like \jingc\Desktop\Learning\Nodejs-Exploration\ to ensure it can use in any os
  res.render('add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
});

// /admin/add-product => POST
Router.post("/add-product", (req, res, next) => {
  products.push({ title: req.body.title });
  console.log(req.body); //showing undefined
  res.redirect("/");
});

exports.routes = Router;
exports.products = products;
