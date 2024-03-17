module.exports = {
  UserRoutes: require('./users.route'),
  ...require('./user.schema'),
  ...require('./users.enum'),
  ...require('./users.service'),
};
