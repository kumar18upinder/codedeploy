"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
class BaseResponse {
    constructor() {
        this.ERROR = {
            NOT_FOUND: {
                statusCode: config_1.CONSTANT.HTTP_CODE.NOT_FOUND,
                message: config_1.CONSTANT.MESSAGES.ERROR.RECORD_NOT_FOUND,
            },
            FORBIDDEN: {
                statusCode: config_1.CONSTANT.HTTP_CODE.FORBIDDEN,
                message: config_1.CONSTANT.MESSAGES.ERROR.FORBIDDEN,
            },
        };
    }
}
exports.default = BaseResponse;
