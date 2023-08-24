const fs = require("fs");
const path = require("path");

const Cart = require("./cart")

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);
const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      return cb([]);
    }
    cb(JSON.parse(fileContent));
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save = () => {
    getProductsFromFile((products) => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          (prod) => prod.id === this.id
        );
        const updatedProduct = [...products];
        updatedProduct[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProduct), (err) => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });
  };

  static fetchAll(cb) {
    getProductsFromFile(cb);
    //callback function to avoid async return
  }

  static findById = (id, cb) => {
    getProductsFromFile((products) => {
      // console.log("find",products)
      const product = products.find((p) => p.id === id);
      cb(product);
    });
  };

  static deleteById = (id) => {
    getProductsFromFile((products) => {
      // console.log("find",products)
      const updatedProduct = products.filter((p) => p.id !== id);
      fs.writeFile(p, JSON.stringify(updatedProduct), (err) => {
        if(!err){
          Cart.deleteProduct(id);
        }
        console.log(err);
      });
    });
  };
};
