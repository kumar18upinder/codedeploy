"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../../models");
const BaseDao_1 = __importDefault(require("../../BaseDao"));
class TaxManager extends BaseDao_1.default {
    constructor() {
        super(models_1.TaxModel);
    }
}
exports.default = new TaxManager();
