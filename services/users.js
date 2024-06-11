const db = require("./db");
const helper = require("../helper");
const config = require("../config");
const jwt = require("jsonwebtoken");
const sequelize = require("./config-db");
const initModels = require("../models/init-models");
const models = initModels(sequelize);

/**
 * usamos bcrypt para encriptar la constraseña del usuario y comparar la contraseña encriptada en BD.
 */
const bcrypt = require("bcrypt");
const { json } = require("express");
const { where } = require("sequelize");
/**
 * Esta funcion se utiliza para registrar un usuario en la base de datos
 * @param {*} user objeto tiene los datos del usuario (ejem: nombre,password)
 * @returns un mensaje si el usuario ha sido creado o no
 */
async function registrar(user) {
  const passwordCifrado = await bcrypt.hash(user.password, 10);
  try {
    const dbUser = await models.users.create({
      ...user,
      password: passwordCifrado,
    });
    return { mensaje: "Usuario creado exitosamente" };
  } catch (error) {
    return { mensaje: "No se pudo crear el usuario" };
  }
}
/**
 * Funcion para loguear el usuario en la API
 * @param {*} user objeto con datos de usuario para loguear (nombre, password)
 * @returns un mensaje si el usuario y contraseña son incorrectos, o el objeto usuario obtenido de la base de datos.
 */
async function login(user) {
  const mensajeUsuarioIncorrecto = "Usuario/Contraseña incorrectos";
  try {
    const dbUser = await models.users.findOne({
      where: {
        username: user.username,
      },
    });
    if (!dbUser) {
      return { mensaje: mensajeUsuarioIncorrecto };
    }
    let esPasswordValido = await bcrypt.compare(user.password, dbUser.password);
    if (!esPasswordValido) {
      return { mensaje: mensajeUsuarioIncorrecto };
    }
    const token = jwt.sign(
      { userId: dbUser.userId, userName: dbUser.userName },
      "secret",
      {
        expiresIn: config.expireTime,
      }
    );
    return { token, dbUser };
  } catch (error) {
    return { mensaje: mensajeUsuarioIncorrecto };
  }
}

module.exports = {
  registrar,
  login,
};
