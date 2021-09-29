const Menu = require("../models/menu");
const Recipe = require("../models/recipe");
const Review = require("../models/review");
const route = require("express").Router();

// [GET] all recipes
route.get("/", async (req, res) => {
  const recipes = await Recipe.find({})
    .populate({
      path: "reviews",
      populate: {
        path: "user",
        model: "users",
      },
    })
    .exec();
  if (!recipes) {
    return res.status(404).json({ message: "No recipes available." });
  }
  return res.status(200).json({ recipes });
});

// [GET] specific recipe
route.get("/:id", async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  if (!recipe) {
    return res.status(404).json({ message: "Recipe not found." });
  }
  return res.status(200).json({ recipe });
});

// [CREATE] recipe
route.post("/", async (req, res) => {
  try {
    const obj = req.body;

    const recipe = new Recipe({
      name: obj.name,
      description: obj.description,
      prep_time_minutes: obj.prep_time_minutes,
      cook_time_minutes: obj.cook_time_minutes,
    });

    const newRecipe = await recipe.save();

    // TODO: push to menu recipes references?
    await Menu.findOneAndUpdate(
      { _id: obj.menuId },
      { $push: { recipes: newRecipe } }
    );

    return res.status(200).json({ recipe: newRecipe });
  } catch (e) {
    throw new Error("Recipe is not created.");
  }
});

// [UPDATE] specific recipe
route.put("/:id", async (req, res) => {
  const updateObj = req.body;

  const updatedRecipe = await Recipe.findByIdAndUpdate(
    req.params.id,
    { $set: updateObj },
    { new: true }
  );

  if (updatedRecipe) {
    return res.status(200).json({ updatedRecipe });
  } else {
    throw new Error("Recipe failed to update.");
  }
});

// [DELETE] specific recipe
route.delete("/:id", async (req, res) => {
  try {
    await Recipe.findByIdAndRemove(req.params.id);
    return res.status(204).end();
  } catch (e) {
    throw new Error("Recipe failed to be deleted.");
  }
});

// [CREATE] review
route.post("/review/:id", async (req, res) => {
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
