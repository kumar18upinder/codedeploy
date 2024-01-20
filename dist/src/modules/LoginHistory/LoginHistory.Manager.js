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
const LoginHistory_Model_1 = __importDefault(require("../../models/LoginHistory.Model"));
class LoginHistoryManager {
    isLoggedIn(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return LoginHistory_Model_1.default.findOne(Object.assign({}, data));
        });
    }
    login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return LoginHistory_Model_1.default.create(data);
        });
    }
    logout(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return LoginHistory_Model_1.default.updateMany({ userId: new mongoose_1.default.Types.ObjectId(data.userId) }, { isLogin: false });
        });
    }
}
exports.default = new LoginHistoryManager();
