const config = require("../config");
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize({
  ...config.db,
  dialect: "mysql",
  logging: customLogger,
});

function customLogger(queryString, queryObject) {
  console.log(queryString); // outputs a string
  console.log(queryObject.bind); // outputs an array
}

module.exports = sequelize;
