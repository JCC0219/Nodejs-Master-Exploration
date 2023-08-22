const express = require("express");
const path = require("path");

const Router = express.Router();

Router.get("/user", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../", "views", "user.html"));
});

Router.post("/user", (req, res, next) => {
  res.redirect("/");
});
module.exports = Router;
