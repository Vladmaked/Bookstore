"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGO_URI_CLOUD = exports.MONGO_URI_LOCAL = void 0;
const { DB_USER = 'admin', DB_PASSWORD = '123super_secret321', DB_NAME = 'bookstore', DB_HOST_LOCAL = 'localhost', DB_PORT_LOCAL = 27017, DB_HOST_CLOUD, } = process.env;
exports.MONGO_URI_LOCAL = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST_LOCAL}:${DB_PORT_LOCAL}/${DB_NAME}`;
exports.MONGO_URI_CLOUD = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST_CLOUD}/${DB_NAME}?retryWrites=true&w=majority`;
//# sourceMappingURL=db.js.map