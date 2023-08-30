// const http = require("http");

const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session); // pass session arguments from previous import
const csrf = require("csurf");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");
const errorController = require("./controllers/error");

const User = require("./models/user");

const MONGODB_URI =
  "mongodb+srv://jingcheng060:dQgoIkwLxLRCQmyr@cluster0.v1voybz.mongodb.net/shop?retryWrites=true&w=majority";

//do this before route handling
const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});
const csrfProtection = csrf();

//to tell node to find which engine to use it
app.set("view engine", "ejs"); // ejs
// implements on view
app.set("views", "views");

//parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public"))); // to make the dir accessible to user
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
app.use(csrfProtection);
//Mongoose store doesnot have the methods in mangoose model!!,
//so we cannot directly use req.session.user to trigger save() find() AnyMethodInModel() method that provided by mongoose model
//please reinitialize this to take back the mangoose model
app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

//request data should be put on top to make it runs everytime a request is comming,
// req.data is independent data for each request

//top down structure
app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use(errorController.get404);

// mongoConnect(() => {
//   app.listen(3000);
// });

mongoose
  .connect(
    "mongodb+srv://jingcheng060:dQgoIkwLxLRCQmyr@cluster0.v1voybz.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .then((result) => {
    console.log("connected to DB");
    app.listen(3000);
  })
  .catch((err) => console.log(err));
