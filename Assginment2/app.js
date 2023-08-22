//in terminal
//npm init
//npm install --save express
//npm install --save-dev nodemon

//configure package.json, by adding nodemon app.js on script

// const http = require("http");
const express = require("express");

const app = express();

// app.use((req, res, next) => {
//   console.log("First middleware");
//   next();
// });

// app.use((req, res, next) => {
//   console.log("Second Middleware");
//   res.send("<h1>Assignment solve almost!</h1>");
// });

app.use("/user", (req, res, next) => {
  console.log("/user");
  res.send("<p>The middleWare that handles just /user</p>");
});

app.use("/", (req, res, next) => {
  console.log("/");
  res.send("<p>The middleWare that handles just /</p>");
});

app.listen(3000);
