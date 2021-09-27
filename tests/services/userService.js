const User = require("../../src/models/user");

const removeUser = async (id) => {
  await User.findByIdAndRemove(id);
};

module.exports = {
  removeUser,
};
