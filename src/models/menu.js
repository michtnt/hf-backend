const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Menu = new Schema({
  type: Number, // 1 : Global, 2: Desserts etc
  name: String,
  recipes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "recipes" }],
    default: [],
    index: true,
  },
  rating: Number,
});

module.exports = mongoose.model("menus", Menu);
