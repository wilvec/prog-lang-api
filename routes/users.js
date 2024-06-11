const express = require("express");
const router = express.Router();
const users = require("../services/users");

/* POST programming language */
router.post("/registrar", async function (req, res, next) {
  try {
    res.json(await users.registrar(req.body));
  } catch (err) {
    console.error(`Error while creating programming language`, err.message);
    next(err);
  }
});

router.post("/login", async function (req, res, next) {
  /*res.setTimeout(20000, () => {
    res.json({ message: "no" });
  });*/

  try {
    res.json(await users.login(req.body));
  } catch (err) {
    console.error(`Error while creating programming language`, err.message);
    next(err);
  }
});

module.exports = router;
