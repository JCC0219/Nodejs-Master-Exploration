const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://jingcheng060:dQgoIkwLxLRCQmyr@cluster0.v1voybz.mongodb.net/shop?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("connected mongodb");
      // console.log(client);
      //connect to a database
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  //return database
  if (_db) {
    return _db;
  }
  throw "No database found";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
