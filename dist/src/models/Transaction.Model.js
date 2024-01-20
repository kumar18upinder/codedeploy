"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../config");
let schema = new mongoose_1.default.Schema({
    adminId: {
        type: mongoose_1.default.Types.ObjectId,
        required: true,
    },
    name: {
        type: String,
        unique: true,
        required: true,
    },
    code: {
        type: String,
        unique: true,
        required: true,
    },
    description: {
        type: String,
        unique: true,
        required: true,
    },
    transaction_status: {
        type: String,
        enum: Object.values(config_1.CONSTANT.TRANSACTION_STATUS),
        default: config_1.CONSTANT.TRANSACTION_STATUS.IN
    },
    status: {
        type: String,
        enum: [
            config_1.CONSTANT.MODEL_STATUS.ACTIVE,
            config_1.CONSTANT.MODEL_STATUS.DELETED,
        ],
        default: config_1.CONSTANT.MODEL_STATUS.ACTIVE
    }
});
exports.default = mongoose_1.default.model("Transaction", schema);
