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
const constants_1 = __importDefault(require("../../../config/constants"));
const CategoryManager_1 = __importDefault(require("./CategoryManager"));
const lib_1 = require("../../../lib");
const config_1 = require("../../../config");
class CategoryController {
    list(data, session) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = {
                    adminId: new mongoose_1.default.Types.ObjectId(session._id),
                    $or: [
                        { name: { $regex: new RegExp(data.searchKey, 'i') } },
                        { code: { $regex: new RegExp(data.searchKey, 'i') } },
                    ]
                };
                const response = yield CategoryManager_1.default.list(query);
                return response;
            }
            catch (err) {
                console.error(err);
                throw err;
            }
        });
    }
    detail(data, session) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const detail = yield CategoryManager_1.default.detail({
                    _id: data.id,
                    adminId: new mongoose_1.default.Types.ObjectId(session._id),
                });
                if (!detail) {
                    throw new lib_1.EXCEPTION_HANDLER.CustomException(constants_1.default.MESSAGES.ERROR.RECORD_NOT_FOUND, config_1.CONSTANT.HTTP_CODE.NOT_FOUND);
                }
                const response = yield CategoryManager_1.default.detail({ _id: data.id });
                return response;
            }
            catch (err) {
                console.error(err);
                throw err;
            }
        });
    }
    add(data, session) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let detail = yield CategoryManager_1.default.detail({ name: data.name });
                if (detail) {
                    throw Error("Name already exist!");
                }
                detail = yield CategoryManager_1.default.detail({ code: data.code });
                if (detail) {
                    throw Error("Code already exist!");
                }
                data.adminId = new mongoose_1.default.Types.ObjectId(session._id);
                const response = yield CategoryManager_1.default.add(data);
                return response;
            }
            catch (err) {
                console.error(err);
                throw err;
            }
        });
    }
    updateStatus(data, session) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let detail = yield CategoryManager_1.default.detail({
                    _id: data.id,
                    adminId: new mongoose_1.default.Types.ObjectId(session._id),
                });
                if (!detail) {
                    throw new lib_1.EXCEPTION_HANDLER.CustomException(constants_1.default.MESSAGES.ERROR.RECORD_NOT_FOUND, config_1.CONSTANT.HTTP_CODE.NOT_FOUND);
                }
                const toUpdate = {
                    status: detail.status === constants_1.default.MODEL_STATUS.ACTIVE ?
                        constants_1.default.MODEL_STATUS.BLOCKED :
                        constants_1.default.MODEL_STATUS.ACTIVE
                };
                const response = yield CategoryManager_1.default.update({ _id: data.id }, toUpdate);
                return response;
            }
            catch (err) {
                console.error(err);
                throw err;
            }
        });
    }
    update(data, session) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let detail = yield CategoryManager_1.default.detail({
                    _id: data.id,
                    adminId: new mongoose_1.default.Types.ObjectId(session._id),
                });
                if (!detail) {
                    throw new lib_1.EXCEPTION_HANDLER.CustomException(constants_1.default.MESSAGES.ERROR.RECORD_NOT_FOUND, config_1.CONSTANT.HTTP_CODE.NOT_FOUND);
                }
                detail = yield CategoryManager_1.default.detail({
                    _id: { $ne: data.id },
                    name: data.name,
                });
                if (!detail) {
                    throw Error("Name already exist!");
                }
                detail = yield CategoryManager_1.default.detail({
                    _id: { $ne: data.id },
                    code: data.code,
                });
                if (!detail) {
                    throw Error("Code already exist!");
                }
                const toUpdate = {};
                if (data.name) {
                    toUpdate.name = data.name;
                }
                if (data.code) {
                    toUpdate.code = data.code;
                }
                const response = yield CategoryManager_1.default.update({ _id: data.id }, toUpdate);
                return response;
            }
            catch (err) {
                console.error(err);
                throw err;
            }
        });
    }
    remove(data, session) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const detail = yield CategoryManager_1.default.detail({
                    _id: data.id,
                    adminId: new mongoose_1.default.Types.ObjectId(session._id)
                });
                if (!detail) {
                    throw new lib_1.EXCEPTION_HANDLER.CustomException(constants_1.default.MESSAGES.ERROR.RECORD_NOT_FOUND, config_1.CONSTANT.HTTP_CODE.NOT_FOUND);
                }
                const response = yield CategoryManager_1.default.remove({ _id: data.id });
                return response;
            }
            catch (err) {
                console.error(err);
                throw err;
            }
        });
    }
}
exports.default = new CategoryController();
