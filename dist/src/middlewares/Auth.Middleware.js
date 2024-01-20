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
exports.isAuthenticated = exports.isOrg = exports.isAdmin = void 0;
const lib_1 = require("../lib");
const config_1 = require("../config");
const models_1 = require("../models");
const LoginHistory_Manager_1 = __importDefault(require("../modules/LoginHistory/LoginHistory.Manager"));
const isAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = yield verifyAuth(req, next);
        if (payload.type !== config_1.CONSTANT.USER_TYPE.ADMIN) {
            throw new lib_1.EXCEPTION_HANDLER.CustomException(config_1.CONSTANT.MESSAGES.FORBIDDEN, config_1.CONSTANT.HTTP_CODE.FORBIDDEN);
        }
        req.body.auth = payload;
        req.auth = payload;
        next();
    }
    catch (err) {
        next(err);
    }
});
exports.isAdmin = isAdmin;
const isOrg = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = yield verifyAuth(req, next);
        if (payload.type !== config_1.CONSTANT.USER_TYPE.ORGANISATION) {
            throw new lib_1.EXCEPTION_HANDLER.CustomException(config_1.CONSTANT.MESSAGES.FORBIDDEN, config_1.CONSTANT.HTTP_CODE.FORBIDDEN);
        }
        req.body.auth = payload;
        req.auth = payload;
        next();
    }
    catch (err) {
        next(err);
    }
});
exports.isOrg = isOrg;
const isAuthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = yield verifyAuth(req, next);
        req.body.auth = payload;
        req.auth = payload;
        next();
    }
    catch (err) {
        next(err);
    }
});
exports.isAuthenticated = isAuthenticated;
const verifyAuth = (req, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.headers.authorization) {
            throw new lib_1.EXCEPTION_HANDLER.CustomException(config_1.CONSTANT.MESSAGES.UNAUTHORIZED_USER, config_1.CONSTANT.HTTP_CODE.NOT_AUTHORIZED);
        }
        let token = req.headers.authorization.split(" ").pop();
        let payload = yield lib_1.AUTH.verifyToken(String(token));
        if (!payload) {
            throw new lib_1.EXCEPTION_HANDLER.CustomException(config_1.CONSTANT.MESSAGES.UNAUTHORIZED_USER, config_1.CONSTANT.HTTP_CODE.NOT_AUTHORIZED);
        }
        let userDetails = yield models_1.AdminModel.findOne({ email: payload.email });
        userDetails = yield LoginHistory_Manager_1.default.isLoggedIn({
            userId: userDetails._id,
            type: userDetails.type,
            isLogin: true,
        });
        if (!userDetails) {
            throw new lib_1.EXCEPTION_HANDLER.CustomException(config_1.CONSTANT.MESSAGES.UNAUTHORIZED_USER, config_1.CONSTANT.HTTP_CODE.NOT_AUTHORIZED);
        }
        return payload;
    }
    catch (err) {
        next(err);
    }
});
