const User = require("../models/user");

const bcrypt = require("bcryptjs");
const {
  removeSensitiveInformation,
  genToken,
  genRandomString,
  genTokenExpiration,
} = require("../utils");

const route = require("express").Router();

route.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: "Email and password is required." });
  }

  const userExist = await User.findOne({ email: email.toLowerCase() });
  if (userExist) {
    return res.status(409).send({ message: "User exist. Please login." });
  }

  // generate and encrypt password
  const salt = await bcrypt.genSalt(10);
  let encryptedPass = await bcrypt.hash(password, salt);

  try {
    // Create user in our database
    const user = await User.create({
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPass,
      type: "default",
    });

    const sanitisedUser = removeSensitiveInformation(user);
    const token = genToken(sanitisedUser, {
      expiresIn: genTokenExpiration(2),
    });

    return res.status(200).json({ user: sanitisedUser, token });
  } catch (e) {
    throw new Error("Register failed.");
  }
});

route.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    return res.status(400).send("Input is required.");
  }

  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const sanitisedUser = removeSensitiveInformation(user);
      const token = genToken(sanitisedUser, {
        expiresIn: genTokenExpiration(2),
      });

      return res.status(200).json({ user: sanitisedUser, token });
    }
    return res.status(500).send("Invalid credentials.");
  } catch (e) {
    throw new Error("Login failed.");
  }
});

module.exports = route;
