"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionModel = exports.UserModel = exports.AdminModel = exports.TaxModel = exports.CharacteristicModel = exports.CategoryModel = void 0;
const Category_Model_1 = __importDefault(require("./Category.Model"));
exports.CategoryModel = Category_Model_1.default;
const Characteristics_Model_1 = __importDefault(require("./Characteristics.Model"));
exports.CharacteristicModel = Characteristics_Model_1.default;
const Tax_Model_1 = __importDefault(require("./Tax.Model"));
exports.TaxModel = Tax_Model_1.default;
const Admin_Model_1 = __importDefault(require("./Admin.Model"));
exports.AdminModel = Admin_Model_1.default;
const User_Model_1 = __importDefault(require("./User.Model"));
exports.UserModel = User_Model_1.default;
const Transaction_Model_1 = __importDefault(require("./Transaction.Model"));
exports.TransactionModel = Transaction_Model_1.default;
