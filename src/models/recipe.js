const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Recipe = new Schema({
  name: { type: String, required: true },
  instructions: [
    {
      start_time: Number,
      end_time: Number,
      display_text: String,
    },
  ],
  // menu: { // each week different set of recipes are selected
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "menus",
  // },
  thumbnail_url: String,
  prep_time_minutes: String,
  cook_time_minutes: String,
  description: String,
  reviews: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "reviews" }],
    default: [],
  },
});

module.exports = mongoose.model("recipes", Recipe);
