require('dotenv').config();

module.exports = {
  ...require('./server.config'),
  ...require('./database.config'),
  ...require('./auth.config'),
};
