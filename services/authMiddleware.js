const jwt = require("jsonwebtoken");

function verificarToken(req, res, next) {
  const token = req.header("Authorization");
  if (!token)
    return res
      .status(401)
      .json({ error: "No está autorizado a acceder a este recurso" });
  try {
    const decoded = jwt.verify(token, "secret");
    req.userId = decoded.userId;
    req.userName = decoded.userName;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      res.status(401).json({ error: "Token expiró" });
    } else {
      res.status(401).json({ error: "Token no válido" });
    }
  }
}

module.exports = verificarToken;
