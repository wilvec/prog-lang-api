const express = require("express");
const app = express();
const timeout = require("connect-timeout");
const cors = require("cors");

const port = 3000;
const programmingLanguagesRouter = require("./routes/programmingLanguages");
const usersRouter = require("./routes/users");
const productsRouter = require("./routes/products");
const ordersRouter = require("./routes/orders");
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

var corsOptions = {
  origin: "http://localhost:3305",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(timeout("10s"));
app.use(haltOnTimedout);

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.use("/programming-languages", programmingLanguagesRouter); //Enrutador de lenguajes de programación
app.use("/users", usersRouter); //Enrutador de usuarios
app.use("/products", productsRouter);
app.use("/orders", ordersRouter); //Enrutador de usuarios
/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

function haltOnTimedout(req, res, next) {
  if (!req.timedout) next();
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
