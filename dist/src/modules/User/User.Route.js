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
const User_Controller_1 = __importDefault(require("./User.Controller"));
const express_joi_validation_1 = __importDefault(require("express-joi-validation"));
const RouteValidator = __importStar(require("../../validator"));
const Auth_Middleware_1 = require("../../middlewares/Auth.Middleware");
const ResponseHandler_1 = __importDefault(require("../ResponseHandler"));
const validator = express_joi_validation_1.default.createValidator();
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    return res.send("Route Success");
});
router.post("/signup", [
    validator.headers(RouteValidator.headerValidate),
    validator.body(RouteValidator.signup)
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield User_Controller_1.default.signup(Object.assign(Object.assign({}, req.body), req.headers));
    return ResponseHandler_1.default.sendResponse(res, data);
}));
router.post("/resend-mail", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield User_Controller_1.default.resenVerificationMail(Object.assign(Object.assign({}, req.body.email), req.headers));
    return ResponseHandler_1.default.sendResponse(res, data);
}));
router.put("/completeProfile", [validator.body(RouteValidator.completeProfile), Auth_Middleware_1.isAuthenticated], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield User_Controller_1.default.completeProfile(req.body);
    return ResponseHandler_1.default.sendResponse(res, data);
}));
router.get("/verify/:id", validator.params(RouteValidator.verifyEmail), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield User_Controller_1.default.verifyEmail({ id: req.params.id });
    return ResponseHandler_1.default.sendResponse(res, data);
}));
router.post("/login", [validator.headers(RouteValidator.headerValidate), validator.body(RouteValidator.login)], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield User_Controller_1.default.login(Object.assign(Object.assign({}, req.body), req.headers));
    return ResponseHandler_1.default.sendResponse(res, data);
}));
router.get("/logout", [validator.headers(RouteValidator.headerValidate), Auth_Middleware_1.isAuthenticated], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield User_Controller_1.default.logout(Object.assign(Object.assign({}, req.body), req.headers));
    return ResponseHandler_1.default.sendResponse(res, data);
}));
exports.default = router;
