"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("../../models");
class User {
    signup(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return models_1.UserModel.create(data);
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return models_1.UserModel.updateOne({ _id: new mongoose_1.default.Types.ObjectId(id) }, data);
        });
    }
    detail(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return models_1.UserModel.findOne(data);
        });
    }
    isPhoneExist(id, phone) {
        return __awaiter(this, void 0, void 0, function* () {
            return models_1.UserModel.findOne({
                _id: { $ne: new mongoose_1.default.Types.ObjectId(id) },
                phone,
            });
        });
    }
    logout(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return models_1.UserModel.updateOne({ email: email }, { $unset: { token: 1 } });
        });
    }
    login(email, token) {
        return __awaiter(this, void 0, void 0, function* () {
            return models_1.UserModel.updateOne({ email }, { token: String(token) });
        });
    }
}
exports.default = new User();
