const { connection, connect, set } = require('mongoose');
const { databaseConfigs } = require('../../../configs');

connection.on('error', () => console.log('Error in Connecting to Database'));
connection.once('open', () => console.log('Connected to Database'));
set('runValidators', true);
set('setDefaultsOnInsert', true);

function connectDatabase() {
  connect(databaseConfigs.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

module.exports = { connectDatabase };
