const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Review = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  rating: Number,
  message: String,
  code: String, // prevent 2 ratings in one entity, reoresented as id_userid
});

module.exports = mongoose.model("reviews", Review);
