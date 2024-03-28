const { UserModel, UserRole } = require('../models');

const isAdmin = async (username) => {
  const user = await UserModel.findOne({ username: username });

  if (user.role == UserRole.FACULTY) {
    return true;
  } else {
    return false;
  }
};

module.exports = isAdmin;
