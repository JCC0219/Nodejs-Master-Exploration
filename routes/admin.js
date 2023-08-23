const express = require("express");
const path = require("path");

const Router = express.Router();

const products = [];

// /admin/add-product => GET
Router.get("/add-product", (req, res, next) => {
  ////using traditional HTML
  // res.sendFile(path.join(__dirname, "../", "views", "add-product.html")); //do not code like \jingc\Desktop\Learning\Nodejs-Exploration\ to ensure it can use in any os

  //using pug templating engine
  // res.render("add-product", { pageTitle: "Add Product" }); //(pug)
  res.render("add-product", {
    prods: products,
    pageTitle: "Add Product",
    productCSS: true,
    formsCSS:true,
    activeAddProduct: true,
  }); //(handlebars)
});

// /admin/add-product => POST
Router.post("/add-product", (req, res, next) => {
  products.push({ title: req.body.title });
  console.log(req.body); //showing undefined
  res.redirect("/");
});

exports.routes = Router;
exports.products = products;
