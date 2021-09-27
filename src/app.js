const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("express-async-errors"); // eliminate try catch

const config = require("./config");
const { verifyToken } = require("./middlewares");

const recipeRoutes = require("./routes/recipe");
const menuRoutes = require("./routes/menu");
const authRoutes = require("./routes/auth");

const app = express();

console.log(config.isDev ? "DEVELOPMENT" : "PRODUCTION");

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("-- CONNECTED TO MONGODB -- ");
  })
  .catch((error) => {
    console.log("-- MONGODB CONNECTION FAILED --", error.message);
  });

// middlewares
app.use(logger("dev")); // log request
app.use(cors());
app.use(express.json()); // parse to JSON

// routes
// un-protected
app.use("/auth", authRoutes);

// protected
app.all("/v1/*", [verifyToken]);
app.use("/v1/recipe", recipeRoutes);
app.use("/v1/menu", menuRoutes);

// error middleware
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
  next(err);
});

module.exports = app;