"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = __importDefault(require("../config/constants"));
class ResponseHandler {
    constructor() {
        this.OK = 200;
        this.ERROR = 400;
    }
    sendResponse(res, data) {
        return res
            .status(constants_1.default.HTTP_CODE.OK)
            .json({
            statusCode: constants_1.default.HTTP_CODE.OK,
            message: "Success",
            data
        });
    }
    sendErrorResponse(res, error, statusCode = constants_1.default.HTTP_CODE.ERROR) {
        console.error(error.stack);
        return res
            .status(statusCode)
            .json({
            statusCode: statusCode,
            message: error.message,
        });
    }
}
exports.default = new ResponseHandler();
