import mongoose from 'mongoose';

import { createApp } from './app';
import { MONGO_URI_CLOUD, MONGO_OPTIONS, APP_PORT } from './config';

(async () => {
  await mongoose.connect(MONGO_URI_CLOUD, MONGO_OPTIONS);

  const app = createApp();

  app.listen(APP_PORT, () => {
    console.log(`Listening on ${APP_PORT}`);
  });
})();
