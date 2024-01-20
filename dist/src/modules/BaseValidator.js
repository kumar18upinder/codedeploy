"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonValidator = exports.validateInput = void 0;
const joi_1 = __importDefault(require("joi"));
const config_1 = require("../config");
// Reusable validation middleware
const validateInput = function (schema) {
    return (req, res, next) => {
        const validationResult = schema.validate(req.body, { abortEarly: false });
        if (validationResult.error) {
            const errorDetails = validationResult.error.details.map((error) => {
                return {
                    message: error.message,
                    path: error.path,
                };
            });
            const jsonError = {
                message: 'Validation error',
                details: errorDetails,
            };
            return res.status(400).json(jsonError);
        }
        next(); // Move to the next middleware/route handler
    };
};
exports.validateInput = validateInput;
exports.CommonValidator = {
    id: joi_1.default.string().trim().required(),
    email: joi_1.default.string().trim().email({ minDomainSegments: 2 }).required(),
    password: joi_1.default.string().trim()
        .min(config_1.CONSTANT.PASSWORD_LENGTH)
        .pattern(new RegExp(config_1.CONSTANT.REGEX.PASSWORD))
        .required()
        .messages({
        'string.min': config_1.CONSTANT.MESSAGES.ERROR.MIN_PASSWORD_LENGTH,
        'string.pattern.base': config_1.CONSTANT.MESSAGES.ERROR.PASSWORD_REGEX,
    }),
};
