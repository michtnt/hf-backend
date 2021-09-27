const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const removeSensitiveInformation = (user) => {
  delete user.password;
  return user;
};

const genToken = (user, options = {}) => {
  // https://github.com/auth0/node-jsonwebtoken/issues/166
  return jwt.sign({ user, options }, JWT_SECRET);
};

const genRandomString = (length) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const genTokenExpiration = (d) => {
  return d * 24 * 60 * 60 * 1000 + Date.now();
};

module.exports = {
  removeSensitiveInformation,
  genToken,
  genRandomString,
  genTokenExpiration,
};
