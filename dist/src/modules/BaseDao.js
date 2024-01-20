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
const constants_1 = __importDefault(require("../config/constants"));
class BaseDao {
    constructor(model) {
        this.MODEL = model;
    }
    /**
     * Get detail
     * @param query
     * @param projection
     * @returns
     */
    detail(query, projection = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.MODEL.findOne(query, projection);
        });
    }
    /**
     * Get list
     * @param query
     * @param projection
     * @returns
     */
    list(query = {}, projection = {}, limit = constants_1.default.QUERY.LIMIT, skip = 0, sort = constants_1.default.QUERY.SORT_BY, sortOrder = -1) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.MODEL.find(query, projection, {
                limit,
                skip,
                sort: { [sort]: sortOrder },
            });
        });
    }
    /**
     * Update
     * @param query
     * @param data
     * @returns
     */
    update(query, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.MODEL.updateOne(query, data);
        });
    }
    /**
     * Remove
     * @param query
     * @returns
     */
    remove(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.MODEL.updateOne({ status: constants_1.default.MODEL_STATUS.DELETED });
        });
    }
    /**
     * Save
     * @param data
     * @returns
     */
    add(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.MODEL.create(data);
        });
    }
}
exports.default = BaseDao;
