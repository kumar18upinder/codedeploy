"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseDao_1 = __importDefault(require("../../BaseDao"));
const models_1 = require("../../../models");
class CharacteristicManager extends BaseDao_1.default {
    constructor() {
        super(models_1.CharacteristicModel);
    }
}
exports.default = new CharacteristicManager();
