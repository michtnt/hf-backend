const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Review = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  rating: Number,
  message: String,
});

module.exports = mongoose.model("reviews", Review);
