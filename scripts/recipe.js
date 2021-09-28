var axios = require("axios").default;
const recipe = require("../src/models/recipe");
const config = require("../src/config");

const mongoose = require("mongoose");

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("-- CONNECTED TO MONGODB -- ");
  })
  .catch((error) => {
    console.log("-- MONGODB CONNECTION FAILED --", error.message);
  });

var options = {
  method: "GET",
  url: "https://tasty.p.rapidapi.com/recipes/list",
  params: { from: "0", size: "50" },
  headers: {
    "x-rapidapi-host": "tasty.p.rapidapi.com",
    "x-rapidapi-key": "42489d623fmsh53a8ebef6f41f12p173a95jsn0c080c160ca0",
  },
};

axios
  .request(options)
  .then(async function (response) {
    let sliced = response.data.results;
    await recipe.insertMany(sliced);
    process.exit();
  })
  .catch(function (error) {
    console.error(error);
  });
