const {
  DB_USER = 'admin',
  DB_PASSWORD = '3eCNDtuv3UmqW1x6',
  DB_NAME = 'bookstore',
  DB_HOST_LOCAL = 'localhost',
  DB_PORT_LOCAL = 27017,
  DB_HOST_CLOUD = 'cluster0.rnmu6.mongodb.net',
} = process.env;

const MONGO_URI_LOCAL = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST_LOCAL}:${DB_PORT_LOCAL}/${DB_NAME}`;

const MONGO_URI_CLOUD = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST_CLOUD}/${DB_NAME}`;
console.log(MONGO_URI_CLOUD);
const MONGO_OPTIONS = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
};

module.exports = {
  DB_HOST_CLOUD,
  DB_HOST_LOCAL,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT_LOCAL,
  DB_USER,
  MONGO_URI_CLOUD,
  MONGO_URI_LOCAL,
  MONGO_OPTIONS,
};
