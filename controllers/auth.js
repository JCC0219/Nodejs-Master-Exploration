const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  //session cookie is stored in the serverside, once server restart cookie wont work
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: false,
  });
};
exports.postLogin = (req, res, next) => {
  User.findById("64ed5f16bc68b3140b164361")
    .then((user) => {
      req.session.user = user;
      req.session.isLoggedIn = true;
      // req.session.save(()=>{
      //   res.redirect('/')
      // })
    })
    .then(() => {

      res.redirect("/");
    })
    .catch((err) => {
      
      console.log(err);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log("123123123123123123123",err);
    res.redirect("/");
  });
};
