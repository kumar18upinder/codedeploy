"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getThreadDetails = exports.addChat = exports.deletedThread = exports.updateThread = exports.addThread = exports.verifyEmail = exports.completeProfile = exports.signup = exports.login = exports.headerValidate = void 0;
const joi_1 = __importDefault(require("joi"));
exports.headerValidate = joi_1.default.object({
    "device-id": joi_1.default.string().optional(),
});
exports.login = joi_1.default.object({
    email: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
});
exports.signup = joi_1.default.object({
    email: joi_1.default.string().trim().required(),
    password: joi_1.default.string().trim().length(8).required(),
});
exports.completeProfile = joi_1.default.object({
    firstName: joi_1.default.string().trim().required(),
    lastName: joi_1.default.string().trim().required(),
    phone: joi_1.default.string().trim().required(),
    dob: joi_1.default.string().trim(),
});
exports.verifyEmail = joi_1.default.object({
    id: joi_1.default.string().required(),
});
exports.addThread = joi_1.default.object({
    title: joi_1.default.string().trim().required(),
});
exports.updateThread = joi_1.default.object({
    title: joi_1.default.string().trim().required(),
    id: joi_1.default.string().trim().required(),
});
exports.deletedThread = joi_1.default.object({
    id: joi_1.default.string().trim().required(),
});
exports.addChat = joi_1.default.object({
    threadId: joi_1.default.string().trim().optional(),
    question: joi_1.default.string().trim().required(),
    answer: joi_1.default.string().trim().required(),
});
exports.getThreadDetails = joi_1.default.object({
    id: joi_1.default.string().trim().required(),
});
