const express = require("express");
const path = require("path")

const Router = express.Router();

// /admin/add-product => GET
Router.get("/add-product", (req, res, next) => {
//   console.log("in /add-product the middleware");
  res.sendFile(path.join(__dirname, "../", "views", "add-product.html")); //do not code like \jingc\Desktop\Learning\Nodejs-Exploration\ to ensure it can use in any os
});

// /admin/add-product => POST
Router.post("/add-product", (req, res, next) => {
//   console.log("in /product the middleware");
  console.log(req.body); //showing undefined
  res.redirect("/");
});

module.exports = Router;
