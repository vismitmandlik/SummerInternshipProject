const { UserModel, UserRole } = require('../models');

const isAdmin = async (username) => {
  // const {username,password}=req.body

  const user = await UserModel.findOne({ username: username });

  if (user.role == UserRole.FACULTY) {
    // res.redirect("/admin-dashboard")
    return true;
  } else {
    // res.redirect("/")
    return false;
  }
};

module.exports = isAdmin;
