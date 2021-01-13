const db = require('./db.js');
const app = require('./app.js');

module.exports = {
  ...db,
  ...app,
};
