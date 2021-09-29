const Recipe = require("../models/recipe");
const Review = require("../models/review");
const route = require("express").Router();

// [GET] reviews
route.get("/", async (req, res) => {
  let reviews = await Review.find({ user: req.user._id });
  if (reviews) {
    return res.status(200).send({ reviews });
  } else {
  }
  throw new Error("Get all user reviews failed.");
});

// [CREATE] review
route.post("/:id", async (req, res) => {
  const { rating, message } = req.body;

  const review = new Review({
    rating,
    message,
    user: req.user,
  });

  const newReview = await review.save();

  // recipe reference tor reviews
  await Recipe.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { reviews: newReview } }
  );

  if (newReview) {
    return res.status(200).json({ newReview });
  } else {
    throw new Error("Review is not created.");
  }
});

module.exports = route;
