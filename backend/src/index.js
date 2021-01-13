const mongoose = require('mongoose');

const { createApp } = require('./app');
const { MONGO_URI_CLOUD, MONGO_OPTIONS, APP_PORT } = require('./config/index');

(async () => {
  await mongoose.connect(MONGO_URI_CLOUD, MONGO_OPTIONS);

  const app = createApp();

  app.listen(APP_PORT, () => {
    console.log(`Listening on ${APP_PORT}`);
  });
})();
