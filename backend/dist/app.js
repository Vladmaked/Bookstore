"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
const express_1 = __importDefault(require("express"));
const errorController_1 = require("./controllers/errorController");
const routerHandler_1 = require("./routes/routerHandler");
exports.createApp = () => {
    const app = express_1.default();
    app.use(express_1.default.json());
    app.use(routerHandler_1.getRoutesHandler());
    app.use(errorController_1.handleError);
    return app;
};
//# sourceMappingURL=app.js.map