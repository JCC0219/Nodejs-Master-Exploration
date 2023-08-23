const express = require("express");
const path = require("path");
const Router = express.Router();
const rootDir = require("../util/path");
const adminData = require("./admin");

Router.get("/", (req, res, next) => {
  // console.log(path.join(__dirname))
  // console.log(path.join(__filename))
  console.log("shop.js",adminData.products); //data is sharing in nodeserver!!!!! no matter in any browser
  res.sendFile(path.join(rootDir, "views", "shop.html"));
});

module.exports = Router;
