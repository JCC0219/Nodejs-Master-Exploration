const Product = require("../model/product");

exports.getAddProduct = (req, res, next) => {
  ////using traditional HTML
  // res.sendFile(path.join(__dirname, "../", "views", "add-product.html")); //do not code like \jingc\Desktop\Learning\Nodejs-Exploration\ to ensure it can use in any os
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  const products = Product.fetchAll((products) => {
    //callback to perform sync code
    res.render("shop", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true,
    });
  });
};
