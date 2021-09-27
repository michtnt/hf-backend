const Menu = require("../models/menu");
const route = require("express").Router();

// [GET] all menu
route.get("/", async (req, res) => {
  const menu = await Menu.find({}).populate("recipes", {
    _id: true,
    name: true,
  });
  if (!menu) {
    return res.status(404).json({ message: "No menu available." });
  }
  return res.status(200).json({ menu });
});

// [GET] specific menu
route.get("/:id", async (req, res) => {
  let menu = await Menu.findById(req.params.id);
  if (!menu) {
    return res.status(404).json({ message: "Menu not found." });
  }
  return res.status(200).json({ menu });
});

//  [CREATE] menu
route.post("/", async (req, res) => {
  const obj = req.body;
  const menu = new Menu({
    name: req.body.name,
    rating: req.body.rating,
  });

  const newMenu = await menu.save();

  if (newMenu) {
    res.status(200).json({ newMenu });
  } else {
    throw new Error("Menu is not created.");
  }
});

// [UPDATE] specific menu
route.put("/:id", async (req, res) => {
  const updateObj = req.body;

  const updatedMenu = await Menu.findByIdAndUpdate(
    req.params.id,
    { $set: updateObj },
    { new: true }
  );

  if (updatedMenu) {
    return res.status(200).json({ updatedMenu });
  } else {
    throw new Error("Menu failed to update.");
  }
});

// [DELETE] specific menu
route.delete("/:id", async (req, res) => {
  try {
    await Menu.findByIdAndRemove(req.params.id);
    return res.status(204).end();
  } catch (e) {
    throw new Error("Menu failed to be deleted.");
  }
});

module.exports = route;
