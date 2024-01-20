"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("./lib/Database");
require("./models");
const ModuleRoute = __importStar(require("./modules"));
const config_1 = require("./config");
class Bootstrap {
    static init() {
        var _a;
        const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3003;
        const app = (0, express_1.default)();
        app.use(express_1.default.json());
        /**
         * Init Middlewares
         */
        Bootstrap.initMiddlewares(app);
        /**
         * Init Routes
         */
        Bootstrap.initRoutes(app);
        app.use((error, req, res, next) => {
            console.info("-----------App Error Handler-----------");
            if (error) {
                console.error(error.stack);
                return res
                    .status(error.statusCode || config_1.CONSTANT.HTTP_CODE.ERROR)
                    .json({
                    statusCode: error.statusCode || config_1.CONSTANT.HTTP_CODE.ERROR,
                    message: error.message,
                });
            }
            next();
        });
        app.listen(port, () => {
            console.log(`Application is running on port ${port}.`);
        });
    }
    static initRoutes(app) {
        console.info("Initialising Routes ...");
        app.use("/admin", ModuleRoute.AdminRoute);
        app.use("/admin/category", ModuleRoute.CategoryRoute);
        app.use("/admin/characteristic", ModuleRoute.CharacteristicsRoute);
        app.use("/admin/tax", ModuleRoute.TaxRoute);
        app.use("/auth", ModuleRoute.UserRoute);
    }
    static initMiddlewares(app) {
        console.info("Initialising Middlewares ...");
        app.use("/", (req, res, next) => {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
            res.setHeader("Access-Control-Allow-Headers", "*");
            res.setHeader("Access-Control-Allow-Credentials", "true");
            res.setHeader("device-id", "dummy");
            console.info(`
            ---------------------------------------------------\n
            Req Headers : ${JSON.stringify(req.headers)} \n
            Req Query : ${JSON.stringify(req.query)} \n
            Req Body : ${JSON.stringify(req.body)} \n
            ---------------------------------------------------\n
            `);
            next();
        });
    }
}
exports.default = Bootstrap;
