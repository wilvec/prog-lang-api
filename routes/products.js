const express = require("express");
const router = express.Router();
const products = require("../services/products");
const verificarToken = require("../services/authMiddleware");
/* POST programming language */
router.post("/registrar", async function (req, res, next) {
  try {
    res.json(await products.registrar(req.body));
  } catch (err) {
    console.error(`Error creando el producto`, err.message);
    next(err);
  }
});

router.get("/", verificarToken, async function (req, res, next) {
  try {
    res.json(await products.listar(req.query.page));
  } catch (err) {
    console.error(`Error creando el producto`, err.message);
    next(err);
  }
});

module.exports = router;
