"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../../models");
const BaseDao_1 = __importDefault(require("../../BaseDao"));
class TransactionManager extends BaseDao_1.default {
    constructor() {
        super(models_1.TransactionModel);
    }
}
exports.default = new TransactionManager();
