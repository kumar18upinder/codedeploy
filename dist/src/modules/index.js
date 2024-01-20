"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaxRoute = exports.CharacteristicsRoute = exports.CategoryRoute = exports.AdminRoute = exports.UserRoute = void 0;
const User_Route_1 = __importDefault(require("./User/User.Route"));
exports.UserRoute = User_Route_1.default;
const AdminRoute_1 = __importDefault(require("./admin/admin/AdminRoute"));
exports.AdminRoute = AdminRoute_1.default;
const CategoryRoute_1 = __importDefault(require("./admin/category/CategoryRoute"));
exports.CategoryRoute = CategoryRoute_1.default;
const CharacteristicsRoute_1 = __importDefault(require("./admin/characteristics/CharacteristicsRoute"));
exports.CharacteristicsRoute = CharacteristicsRoute_1.default;
const TaxRoute_1 = __importDefault(require("./admin/tax/TaxRoute"));
exports.TaxRoute = TaxRoute_1.default;
