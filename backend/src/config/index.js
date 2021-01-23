const db = require('./db.js');
const app = require('./app.js');
const auth = require('./auth');

module.exports = {
  ...db,
  ...app,
  ...auth,
};
