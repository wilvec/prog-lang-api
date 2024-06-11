var DataTypes = require("sequelize").DataTypes;
var _order_details = require("./order_details");
var _orders = require("./orders");
var _products = require("./products");
var _users = require("./users");

function initModels(sequelize) {
  var order_details = _order_details(sequelize, DataTypes);
  var orders = _orders(sequelize, DataTypes);
  var products = _products(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  orders.belongsToMany(products, {
    as: "products_idproduct_products",
    through: order_details,
    foreignKey: "orders_idorder",
    otherKey: "products_idproduct",
  });
  products.belongsToMany(orders, {
    as: "orders_idorder_orders",
    through: order_details,
    foreignKey: "products_idproduct",
    otherKey: "orders_idorder",
  });
  order_details.belongsTo(orders, {
    as: "orders_idorder_order",
    foreignKey: "orders_idorder",
  });
  orders.hasMany(order_details, {
    as: "order_details",
    foreignKey: "orders_idorder",
  });
  order_details.belongsTo(products, {
    as: "products_idproduct_product",
    foreignKey: "products_idproduct",
  });
  products.hasMany(order_details, {
    as: "order_details",
    foreignKey: "products_idproduct",
  });
  orders.belongsTo(users, {
    as: "users_iduser_user",
    foreignKey: "users_iduser",
  });
  users.hasMany(orders, { as: "orders", foreignKey: "users_iduser" });

  return {
    order_details,
    orders,
    products,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
