const db = require("./db");
const helper = require("../helper");
const config = require("../config");
const jwt = require("jsonwebtoken");
const sequelize = require("./config-db");
const initModels = require("../models/init-models");
const products = require("../models/products");
const models = initModels(sequelize);

async function registrar(product) {
  try {
    const dbProduct = await models.products.create({ ...product });
    return {
      mensaje: "Producto creado exitosamente",
      product: dbProduct,
    };
  } catch (error) {
    return { message: "No se pudo crear el producto" };
  }
}

async function listar(page) {
  try {
    console.log(
      "KJSDKJSDKJSDJK = " + helper.getOffset(page, config.listPerPage)
    );
    const dbProducts = await models.products.findAll({
      limit: config.listPerPage,
      offset: helper.getOffset(page, config.listPerPage),
    });
    return { products: dbProducts };
  } catch (error) {
    return { message: "No se pudo crear el producto", products: [] };
  }
}

module.exports = {
  registrar,
  listar,
};
