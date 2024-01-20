"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomException = void 0;
const config_1 = require("../config");
class CustomException extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = config_1.CONSTANT.HTTP_CODE.ERROR;
        this.statusCode = statusCode !== null && statusCode !== void 0 ? statusCode : this.statusCode;
    }
}
exports.CustomException = CustomException;
