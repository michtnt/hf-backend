const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Menu = new Schema({
  name: { type: String, required: true },
  description: String,
  recipes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "recipes" }],
    default: [],
    index: true,
  },
  reviews: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "reviews" }],
    default: [],
  },
});

module.exports = mongoose.model("menus", Menu);
