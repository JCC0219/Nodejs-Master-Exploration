const Product = require("../model/product");

exports.getProducts = (req, res, next) => {
  const products = Product.fetchAll((products) => {
    //callback to perform sync code
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId, (product) => {
    res.render("shop/product-detail", {
      product: product,
      pageTitle: product.title,
      path:"/products"
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    //callback to perform sync code
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/products",
    });
  });
};

exports.getCart = (req, res, next) => {
  const products = Product.fetchAll((products) => {
    //callback to perform sync code
    res.render("shop/cart", {
      pageTitle: "Your Cart",
      path: "/cart",
    });
  });
};

exports.getOrders = (req, res, next) => {
  const products = Product.fetchAll((products) => {
    //callback to perform sync code
    res.render("shop/orders", {
      pageTitle: "Your Orders",
      path: "/orders",
    });
  });
};

exports.getCheckout = (req, res, next) => {
  const products = Product.fetchAll((products) => {
    //callback to perform sync code
    res.render("shop/checkout", {
      pageTitle: "Chekout",
      path: "/checkout",
    });
  });
};
