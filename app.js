// const http = require("http");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/error");

const mongoConnect = require("./util/database").mongoConnect;
const User = require("./models/user");

//do this before route handling
const app = express();

//to tell node to find which engine to use it
app.set("view engine", "ejs"); // ejs
// implements on view
app.set("views", "views");

//parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public"))); // to make the dir accessible to user

app.use((req, res, next) => {
  User.findById("64ec5c1bdfd7e17d7bf275f8")
    .then((user) => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

//top down structure
app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect(() => {
  app.listen(3000);
});
