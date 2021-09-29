var axios = require("axios").default;
const Menu = require("../src/models/menu");
const config = require("../src/config");
const mongoose = require("mongoose");

const assignRecipes = async () => {
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
    method: "POST",
    url: "http://localhost:3001/v1/recipe",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoidGVzdEBlbWFpbC5jb20iLCJfaWQiOiI2MTU0NTNlNzk2ZGQwMTFiYzg1NDlmNDEiLCJfX3YiOjB9LCJvcHRpb25zIjp7ImV4cGlyZXNJbiI6MTYzMzA4OTI1NTg4Nn0sImlhdCI6MTYzMjkxNjQ1NX0.ZumCn9pigGrPyWja40MOIP1_cllLtqhabaAeZsMkn1M",
    },
  };

  let menus = [
    {
      name: "Global",
      type: 1,
    },
    {
      name: "Japanese",
      type: 2,
    },
    {
      name: "European",
      type: 3,
    },
    {
      name: "Korean",
      type: 4,
    },
    {
      name: "Indonesian",
      type: 5,
    },
  ];

  await Menu.insertMany(menus);

  var options = {
    method: "GET",
    url: "http://localhost:3001/v1/recipe",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoidGVzdEBlbWFpbC5jb20iLCJfaWQiOiI2MTU0NTNlNzk2ZGQwMTFiYzg1NDlmNDEiLCJfX3YiOjB9LCJvcHRpb25zIjp7ImV4cGlyZXNJbiI6MTYzMzA4OTI1NTg4Nn0sImlhdCI6MTYzMjkxNjQ1NX0.ZumCn9pigGrPyWja40MOIP1_cllLtqhabaAeZsMkn1M",
    },
  };
  let response1 = await axios.request(options);
  let recipes = response1.data.recipes;
  let i = 0;

  var options = {
    method: "GET",
    url: "http://localhost:3001/v1/menu",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoidGVzdEBlbWFpbC5jb20iLCJfaWQiOiI2MTU0NTNlNzk2ZGQwMTFiYzg1NDlmNDEiLCJfX3YiOjB9LCJvcHRpb25zIjp7ImV4cGlyZXNJbiI6MTYzMzA4OTI1NTg4Nn0sImlhdCI6MTYzMjkxNjQ1NX0.ZumCn9pigGrPyWja40MOIP1_cllLtqhabaAeZsMkn1M",
    },
  };

  let response = await axios.request(options);
  if (response.data.menus) {
    for (let menu of response.data.menus) {
      await Menu.findOneAndUpdate(
        { _id: menu._id },
        { $push: { recipes: { $each: recipes.slice(i * 5, (i + 1) * 5) } } }
      );
      i++;
    }
  }

  process.exit(0);
};

assignRecipes();
