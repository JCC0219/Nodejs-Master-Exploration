const express = require("express");
const path = require("path");
const Router = express.Router();
const rootDir = require("../util/path");
const adminData = require("./admin");

Router.get("/", (req, res, next) => {
  // console.log("shop.js",adminData.products); //data is sharing in nodeserver!!!!! no matter in any browser

  const products = adminData.products;

  ////using traditional HTML
  // res.sendFile(path.join(rootDir, "views", "shop.html"));

  //using pug templating engine
  res.render("shop", { prods: products, docTitle: "Shop" });
});

module.exports = Router;
