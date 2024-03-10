const UserSchemaExports = require('./user.schema');
const UsersEnumExports = require('./users.enum');

module.exports = {
  ...UserSchemaExports,
  ...UsersEnumExports,
};
