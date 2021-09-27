const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

User.set("toJSON", {
  transform: (document, obj) => {
    delete obj.password; // hide password
  },
});

module.exports = mongoose.model("users", User);
