const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const extractToken = (_req) => {
  const authorization = _req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

const verifyToken = async (req, res, next) => {
  const token = extractToken(req);
  let decoded;
  if (token) {
    decoded = jwt.verify(token, JWT_SECRET);
  }

  if (!token || !decoded || decoded.options.expiresIn <= Date.now()) {
    return res.status(401).json({ message: "Invalid token." });
  }

  try {
    const user = await User.findById({ _id: decoded.user._id });

    if (!user) {
      return res.status(409).json({ message: "User not found." });
    }
    req.user = user;
    next();
  } catch (e) {
    throw new Error("Failed to verify token.");
  }
};

module.exports = {
  verifyToken,
};
