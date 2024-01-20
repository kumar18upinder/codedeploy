"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("../../../models");
class AdminManager {
    findOne(query = {}) {
        return models_1.AdminModel.findOne(query);
    }
    create(data) {
        return models_1.AdminModel.create(data);
    }
    updateOne(adminId, data) {
        return models_1.AdminModel.updateOne({ _id: new mongoose_1.default.Types.ObjectId(adminId) }, data);
    }
    details(id) {
        return models_1.AdminModel.findOne({ _id: new mongoose_1.default.Types.ObjectId(id) });
    }
}
exports.default = new AdminManager();
