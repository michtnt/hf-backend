const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Recipe = new Schema({
  name: String,
  // ingredients: String,
  // instructions: String,
  // allergens: String,
  // preptime: String,
  // cookingDifficulty: Number,
  menu: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "menus",
  },
  rating: Number,
});

module.exports = mongoose.model("recipes", Recipe);
