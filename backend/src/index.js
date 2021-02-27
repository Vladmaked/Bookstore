const mongoose = require('mongoose');
const path = require('path');

const { createApp } = require('./app');
const { MONGO_URI_CLOUD, MONGO_OPTIONS, APP_PORT } = require('./config/index');

global.appRoot = path.dirname(__dirname);

(async () => {
  await mongoose.connect(MONGO_URI_CLOUD, MONGO_OPTIONS);

  const app = createApp();

  app.listen(APP_PORT, () => {
    console.log(`Listening on ${APP_PORT}`);
  });
})();
