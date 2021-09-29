require("dotenv").config();

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;
const isDev = process.env.NODE_ENV == "DEVELOPMENT" ? true : false;

module.exports = {
  MONGODB_URI,
  PORT,
  JWT_SECRET,
  isDev,
};
