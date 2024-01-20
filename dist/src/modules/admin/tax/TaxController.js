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
const constants_1 = __importDefault(require("../../../config/constants"));
const TaxManager_1 = __importDefault(require("./TaxManager"));
class TaxController {
    list(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = {
                    $or: [
                        { name: { $regex: new RegExp(data.searchKey, 'i') } },
                        { code: { $regex: new RegExp(data.searchKey, 'i') } },
                    ]
                };
                const response = yield TaxManager_1.default.list(query);
                return response;
            }
            catch (err) {
                console.error(err);
                throw err;
            }
        });
    }
    detail(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const detail = yield TaxManager_1.default.detail({ _id: data.id });
                if (!detail) {
                    throw Error(constants_1.default.MESSAGES.ERROR.RECORD_NOT_FOUND);
                }
                const response = yield TaxManager_1.default.detail({ _id: data.id });
                return response;
            }
            catch (err) {
                console.error(err);
                throw err;
            }
        });
    }
    add(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let detail = yield TaxManager_1.default.detail({ code: data.code });
                if (!detail) {
                    throw Error("Code already exist!");
                }
                const response = yield TaxManager_1.default.add(data);
                return response;
            }
            catch (err) {
                console.error(err);
                throw err;
            }
        });
    }
    update(params, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const detail = yield TaxManager_1.default.detail({ _id: params.id });
                if (!detail) {
                    throw Error(constants_1.default.MESSAGES.ERROR.RECORD_NOT_FOUND);
                }
                const toUpdate = {};
                if (data.code) {
                    toUpdate.name = data.code;
                }
                if (data.description) {
                    toUpdate.code = data.description;
                }
                if (data.value) {
                    toUpdate.code = data.value;
                }
                const response = yield TaxManager_1.default.update({ _id: params.id }, toUpdate);
                return response;
            }
            catch (err) {
                console.error(err);
                throw err;
            }
        });
    }
    updateStatus(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const detail = yield TaxManager_1.default.detail({ _id: params.id });
                if (!detail) {
                    throw Error(constants_1.default.MESSAGES.ERROR.RECORD_NOT_FOUND);
                }
                const toUpdate = {
                    status: detail.status === constants_1.default.MODEL_STATUS.ACTIVE ?
                        constants_1.default.MODEL_STATUS.BLOCKED :
                        constants_1.default.MODEL_STATUS.ACTIVE
                };
                const response = yield TaxManager_1.default.update({ _id: params.id }, toUpdate);
                return response;
            }
            catch (err) {
                console.error(err);
                throw err;
            }
        });
    }
    remove(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const detail = yield TaxManager_1.default.detail({ _id: params.id });
                if (!detail) {
                    throw Error(constants_1.default.MESSAGES.ERROR.RECORD_NOT_FOUND);
                }
                const response = yield TaxManager_1.default.remove({ _id: params.id });
                return response;
            }
            catch (err) {
                console.error(err);
                throw err;
            }
        });
    }
}
exports.default = new TaxController();
