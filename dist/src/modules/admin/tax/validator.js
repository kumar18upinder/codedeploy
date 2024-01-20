"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateParam = exports.update = exports.remove = exports.detail = exports.add = exports.list = void 0;
const joi_1 = __importDefault(require("joi"));
const constants_1 = __importDefault(require("../../../config/constants"));
exports.list = joi_1.default.object({
    pageNo: joi_1.default.number().default(1),
    limit: joi_1.default.number().default(10),
    sortBy: joi_1.default.string().trim().default("updateAt"),
    searchKey: joi_1.default.string().trim().optional(),
});
exports.add = joi_1.default.object({
    code: joi_1.default.string().trim().optional().pattern(/^[a-zA-Z0-9]+$/)
        .messages({
        'string.pattern.base': constants_1.default.MESSAGES.ERROR.NO_SPACE_SP_CHARACTER_REGEX,
    }),
    value: joi_1.default.string().trim().required(),
    description: joi_1.default.string().trim().required(),
});
exports.detail = joi_1.default.object({
    id: joi_1.default.string().trim().required(),
});
exports.remove = joi_1.default.object({
    id: joi_1.default.string().trim().required(),
});
exports.update = joi_1.default.object({
    value: joi_1.default.string().trim().optional(),
    code: joi_1.default.string().trim().optional().pattern(/^[a-zA-Z0-9]+$/)
        .messages({
        'string.pattern.base': constants_1.default.MESSAGES.ERROR.NO_SPACE_SP_CHARACTER_REGEX,
    }),
    description: joi_1.default.string().trim().required(),
});
exports.updateParam = joi_1.default.object({
    id: joi_1.default.string().trim().required(),
});
