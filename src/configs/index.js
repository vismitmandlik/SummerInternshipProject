require('dotenv').config();

module.exports = {
  ...require('./auth.config'),
  ...require('./database.config'),
  ...require('./auth.config'),
};
