const db = require("./db");
const helper = require("../helper");
const config = require("../config");
const jwt = require("jsonwebtoken");
const sequelize = require("./config-db");
const initModels = require("../models/init-models");
const order_details = require("../models/order_details");
const models = initModels(sequelize);

async function registrar(order) {
  try {
    const dbOrder = await models.orders.create(
      { ...order },
      {
        include: [
          {
            model: models.products,
            through: models.order_details,
            as: "products_idproduct_products",
            ignoreDuplicates: true,
          },
        ],
      }
    );

    return {
      mensaje: "pedido creado exitosamente",
      idOrder: dbOrder.idorder,
    };
  } catch (error) {
    console.log(error);
    return { message: "No se pudo crear el pedido" };
  }
}

module.exports = {
  registrar,
};
