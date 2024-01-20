"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express_1 = require("express");
const express_joi_validation_1 = __importDefault(require("express-joi-validation"));
const VALIDATE = __importStar(require("./validator"));
const ResponseHandler_1 = __importDefault(require("../../ResponseHandler"));
const CharacteristicsController_1 = __importDefault(require("./CharacteristicsController"));
const Auth_Middleware_1 = require("../../../middlewares/Auth.Middleware");
const validator = express_joi_validation_1.default.createValidator();
const router = (0, express_1.Router)();
exports.default = router
    .use([Auth_Middleware_1.isOrg])
    .get("/", [validator.params(VALIDATE.list)], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return CharacteristicsController_1.default.list(Object.assign(Object.assign({}, req.query), req.body))
        .then(response => ResponseHandler_1.default.sendResponse(res, response))
        .catch(error => ResponseHandler_1.default.sendErrorResponse(res, error));
}))
    .get("/:id", [validator.params(VALIDATE.detail)], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return CharacteristicsController_1.default.detail(Object.assign(Object.assign(Object.assign({}, req.query), req.params), req.body))
        .then(response => ResponseHandler_1.default.sendResponse(res, response))
        .catch(error => ResponseHandler_1.default.sendErrorResponse(res, error));
}))
    .post("/", [validator.body(VALIDATE.add)], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return CharacteristicsController_1.default.add(req.body)
        .then(response => ResponseHandler_1.default.sendResponse(res, response))
        .catch(error => ResponseHandler_1.default.sendErrorResponse(res, error));
}))
    .patch("/update/:id", [validator.params(VALIDATE.updateParam), validator.body(VALIDATE.update)], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return CharacteristicsController_1.default.update(Object.assign(Object.assign({}, req.params), req.body))
        .then(response => ResponseHandler_1.default.sendResponse(res, response))
        .catch(error => ResponseHandler_1.default.sendErrorResponse(res, error));
}))
    .patch("/status/:id", [validator.params(VALIDATE.updateParam)], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return CharacteristicsController_1.default.updateStatus(Object.assign(Object.assign({}, req.params), req.body))
        .then(response => ResponseHandler_1.default.sendResponse(res, response))
        .catch(error => ResponseHandler_1.default.sendErrorResponse(res, error));
}))
    .delete("/:id", [validator.params(VALIDATE.remove)], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return CharacteristicsController_1.default.remove(Object.assign(Object.assign({}, req.params), req.body))
        .then(response => ResponseHandler_1.default.sendResponse(res, response))
        .catch(error => ResponseHandler_1.default.sendErrorResponse(res, error));
}));
