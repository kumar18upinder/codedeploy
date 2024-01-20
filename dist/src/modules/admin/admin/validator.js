"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.add = exports.validateLoginOrg = exports.validateOrgStatus = exports.validateApproveOrgBody = exports.validateApproveOrg = void 0;
const joi_1 = __importDefault(require("joi"));
const constants_1 = __importDefault(require("../../../config/constants"));
exports.validateApproveOrg = joi_1.default.object({
    orgId: joi_1.default.string().trim().required(),
});
exports.validateApproveOrgBody = joi_1.default.object({
    type: joi_1.default.string().trim().valid(constants_1.default.MODEL_STATUS.ACTIVE, constants_1.default.MODEL_STATUS.REJECTED).required(),
}).unknown(true);
exports.validateOrgStatus = joi_1.default.object({
    id: joi_1.default.string().trim().required(),
});
exports.validateLoginOrg = joi_1.default.object({
    email: joi_1.default.string().trim().email().required(),
    password: joi_1.default.string().trim().required(),
});
exports.add = joi_1.default.object({
    email: joi_1.default.string().trim().email({ minDomainSegments: 2 }).required(),
    password: joi_1.default.string().trim()
        .min(8)
        .pattern(new RegExp(constants_1.default.REGEX.PASSWORD))
        .required()
        .messages({
        'string.min': constants_1.default.MESSAGES.ERROR.MIN_PASSWORD_LENGTH,
        'string.pattern.base': constants_1.default.MESSAGES.ERROR.PASSWORD_REGEX,
    }),
});
