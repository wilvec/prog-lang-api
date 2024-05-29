const db = require("./db");
const helper = require("../helper");
const config = require("../config");
/**
 * usamos bcrypt para encriptar la constraseña del usuario y comparar la contraseña encriptada en BD.
 */
const bcrypt = require("bcrypt");
/**
 * Esta funcion se utiliza para registrar un usuario en la base de datos
 * @param {*} user objeto tiene los datos del usuario (ejem: nombre,password)
 * @returns un mensaje si el usuario ha sido creado o no
 */
async function registrar(user) {
  const plainPassword = bcrypt.hash(user.password, 10);

  const result = await db.query(
    `INSERT INTO lenguajesprog.users (username,password) VALUES(?,?)`,
    [user.username, plainPassword]
  );
  if (!result.affectedRows) {
    return { mensaje: "No se pudo crear el usuario" };
  }
  return { mensaje: "Usuario creado exitosamente" };
}
/**
 * Funcion para loguear el usuario en la API
 * @param {*} user objeto con datos de usuario para loguear (nombre, password)
 * @returns un mensaje si el usuario y contraseña son incorrectos, o el objeto usuario obtenido de la base de datos.
 */
async function login(user) {
  const result = await db.query(
    `SELECT iduser, username, password FROM lenguajesprog.users 
    WHERE username = ?`,
    [user.username]
  );
  const dbUser = result[0];
  const mensaje = { mensaje: "Usuario/Contraseña incorrectos" };
  if (!dbUser) {
    return mensaje;
  }
  let esPasswordValido = bcrypt.compare(user.password, dbUser.password);
  if (!esPasswordValido) {
    return mensaje;
  }
  return dbUser;
}

module.exports = {
  registrar,
  login,
};
