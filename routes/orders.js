const express = require("express");
const router = express.Router();
const orders = require("../services/orders");
const verificarToken = require("../services/authMiddleware");
/* POST programming language */
router.post("/registrar", async function (req, res, next) {
  try {
    res.json(await orders.registrar(req.body));
  } catch (err) {
    console.error(`Error creando el producto`, err.message);
    next(err);
  }
});

module.exports = router;
