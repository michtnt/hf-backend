const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Recipe = new Schema({
  name: String,
  instructions: [
    {
      start_time: Number,
      end_time: Number,
      display_text: String,
    },
  ],
  menu: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "menus",
  },
  rating: Number,
  thumbnail_url: String,
  prep_time_minutes: String,
  cook_time_minutes: String,
  description: String,
});

module.exports = mongoose.model("recipes", Recipe);
