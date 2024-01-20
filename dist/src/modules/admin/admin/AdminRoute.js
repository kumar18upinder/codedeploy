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
const express_1 = require("express");
const express_joi_validation_1 = __importDefault(require("express-joi-validation"));
const ResponseHandler_1 = __importDefault(require("../../ResponseHandler"));
const AdminController_1 = __importDefault(require("./AdminController"));
const validator_1 = require("./validator");
const Auth_Middleware_1 = require("../../../middlewares/Auth.Middleware");
const router = (0, express_1.Router)();
const validator = express_joi_validation_1.default.createValidator();
router.post("/signup", [validator.body(validator_1.add)], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return AdminController_1.default.addAdmin(req.body)
        .then(response => ResponseHandler_1.default.sendResponse(res, response))
        .catch(error => ResponseHandler_1.default.sendErrorResponse(res, error));
}));
router.post("/login", [validator.body(validator_1.validateLoginOrg)], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return AdminController_1.default.login(req.body)
        .then(response => ResponseHandler_1.default.sendResponse(res, response))
        .catch(error => ResponseHandler_1.default.sendErrorResponse(res, error));
}));
router.post("/logout", [Auth_Middleware_1.isAuthenticated], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return AdminController_1.default.logout(req.body.auth)
        .then(response => ResponseHandler_1.default.sendResponse(res, response))
        .catch(error => ResponseHandler_1.default.sendErrorResponse(res, error));
}));
router.patch("/updatePassword", [Auth_Middleware_1.isOrg], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return AdminController_1.default.updatePassword(req.body, req.body.auth)
        .then(response => ResponseHandler_1.default.sendResponse(res, response))
        .catch(error => ResponseHandler_1.default.sendErrorResponse(res, error));
}));
router.patch("/organisation/approval/:orgId", [Auth_Middleware_1.isAdmin, validator.params(validator_1.validateApproveOrg), validator.body(validator_1.validateApproveOrgBody)], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return AdminController_1.default.approveOrg(Object.assign(Object.assign({}, req.params), req.body))
        .then(response => ResponseHandler_1.default.sendResponse(res, response))
        .catch(error => ResponseHandler_1.default.sendErrorResponse(res, error));
}));
router.patch("/organisation/status/:id", [Auth_Middleware_1.isAdmin, validator.params(validator_1.validateOrgStatus)], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return AdminController_1.default.accountStatus(req.params)
        .then(response => ResponseHandler_1.default.sendResponse(res, response))
        .catch(error => ResponseHandler_1.default.sendErrorResponse(res, error));
}));
router.get("/organisation/detail/:id", [Auth_Middleware_1.isAdmin, validator.params(validator_1.validateOrgStatus)], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return AdminController_1.default.details(req.params)
        .then(response => ResponseHandler_1.default.sendResponse(res, response))
        .catch(error => ResponseHandler_1.default.sendErrorResponse(res, error));
}));
exports.default = router;
