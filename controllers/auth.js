exports.getLogin = (req, res, next) => {
  // console.log(typeof isLoggedin)
  //session cookie is stored in the serverside, once server restart cookie wont work
  console.log(req.session.isLoggedin);
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: false,
  });
};
exports.postLogin = (req, res, next) => {
  req.session.isLoggedin = true;
  res.redirect("/");
};
