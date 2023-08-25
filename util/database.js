const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "010219", {
  dialect: "mysql",
  host:"localhost"
});

module.exports = sequelize