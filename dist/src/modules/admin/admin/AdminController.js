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
const generate_password_1 = __importDefault(require("generate-password"));
const AdminManager_1 = __importDefault(require("./AdminManager"));
const Auth_1 = __importDefault(require("../../../lib/Auth"));
const constants_1 = __importDefault(require("../../../config/constants"));
const LoginHistory_Manager_1 = __importDefault(require("../../LoginHistory/LoginHistory.Manager"));
const Mailer_1 = require("../../../lib/Mailer");
const lib_1 = require("../../../lib");
class AdminController {
    addAdmin(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isExist = yield AdminManager_1.default.findOne({ email: data.email });
                if (isExist) {
                    throw Error("Email already exist");
                }
                data.password = yield Auth_1.default.hash(data.password);
                data.type = constants_1.default.USER_TYPE.ADMIN;
                const response = yield AdminManager_1.default.create(data);
                return response;
            }
            catch (err) {
                console.error(err);
                throw err;
            }
        });
    }
    login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response = yield AdminManager_1.default.findOne({ email: data.email });
                if (!response) {
                    throw new lib_1.EXCEPTION_HANDLER.CustomException(constants_1.default.MESSAGES.EMAIL_NOT_FOUND, constants_1.default.HTTP_CODE.NOT_FOUND);
                }
                if (response.status === constants_1.default.MODEL_STATUS.PENDING) {
                    throw Error(constants_1.default.MESSAGES.ORG.PENDING);
                }
                response = response.toObject();
                const isPasswordValid = yield Auth_1.default.compare(data.password, String(response.password));
                if (!isPasswordValid) {
                    throw Error(constants_1.default.MESSAGES.INVALID_PASSWORD);
                }
                const accessToken = yield Auth_1.default.createToken({
                    email: response.email,
                    type: response.type,
                });
                LoginHistory_Manager_1.default.login({
                    userId: response._id,
                    type: response.type,
                });
                return Object.assign(Object.assign({}, response), { accessToken });
            }
            catch (err) {
                console.error(err);
                throw err;
            }
        });
    }
    updatePassword(data, session) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response = yield AdminManager_1.default.findOne({ email: session.email });
                if (!response) {
                    throw new lib_1.EXCEPTION_HANDLER.CustomException(constants_1.default.MESSAGES.EMAIL_NOT_FOUND, constants_1.default.HTTP_CODE.NOT_FOUND);
                }
                const isValidPassword = yield Auth_1.default.compare(data.oldPassword, response.password);
                if (!isValidPassword) {
                    throw Error("Invalid old password");
                }
                const hash = yield Auth_1.default.hash(data.password);
                response = yield AdminManager_1.default.updateOne(response._id, { password: hash });
                return response;
            }
            catch (err) {
                console.log(err);
                throw err;
            }
        });
    }
    approveOrg(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response = yield AdminManager_1.default.details(data.orgId);
                if (!response) {
                    throw Error(constants_1.default.MESSAGES.ORG.INVALID_ACCOUNT);
                }
                if (response.status !== constants_1.default.MODEL_STATUS.PENDING) {
                    throw Error(constants_1.default.MESSAGES.ORG.ALREADY_APPROVED);
                }
                if (data.type === constants_1.default.MODEL_STATUS.REJECTED) {
                    yield AdminManager_1.default.updateOne(response._id, {
                        status: constants_1.default.MODEL_STATUS.REJECTED,
                    });
                    (0, Mailer_1.sendOrgAccountRejectMail)({});
                    return true;
                }
                const password = generate_password_1.default.generate({
                    length: 8,
                    numbers: true,
                    symbols: true,
                    uppercase: true,
                    lowercase: true,
                    excludeSimilarCharacters: true, // Exclude similar characters (e.g., 1, I, l, O, 0)
                });
                const hash = yield Auth_1.default.hash(password);
                const mailData = {
                    email: response.email,
                    password: password
                };
                response = yield AdminManager_1.default.updateOne(response._id, {
                    status: constants_1.default.MODEL_STATUS.ACTIVE,
                    password: hash
                });
                (0, Mailer_1.sendOrgWelcomeMail)(mailData);
                return !!response;
            }
            catch (err) {
                console.log(err);
                throw err;
            }
        });
    }
    accountStatus(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response = yield AdminManager_1.default.details(data.id);
                if (!response ||
                    [constants_1.default.MODEL_STATUS.PENDING, constants_1.default.MODEL_STATUS.DELETED].includes(response.status)) {
                    throw Error(constants_1.default.MESSAGES.ORG.INVALID_ACCOUNT);
                }
                const status = response.status === constants_1.default.MODEL_STATUS.ACTIVE ? constants_1.default.MODEL_STATUS.BLOCKED : constants_1.default.MODEL_STATUS.ACTIVE;
                response = yield AdminManager_1.default.updateOne(response._id, { status });
                return !!response;
            }
            catch (err) {
                console.log(err);
                throw err;
            }
        });
    }
    details(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response = yield AdminManager_1.default.details(data.id);
                if (!response) {
                    throw new lib_1.EXCEPTION_HANDLER.CustomException(constants_1.default.MESSAGES.EMAIL_NOT_FOUND, constants_1.default.HTTP_CODE.NOT_FOUND);
                }
                return response;
            }
            catch (err) {
                console.error(err);
                throw err;
            }
        });
    }
    logout(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let detail = yield AdminManager_1.default.findOne({ email: data.email });
                if (!detail) {
                    throw Error(constants_1.default.MESSAGES.ERROR.INVALID_USER);
                }
                detail.userId = detail._id;
                yield LoginHistory_Manager_1.default.logout(detail);
                return true;
            }
            catch (err) {
                console.error(err);
                throw err;
            }
        });
    }
    validateResetPasswordLink(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const decodedValue = yield Auth_1.default.verifyToken(data.token);
                if (!decodedValue) {
                    throw Error("Invalid link");
                }
                const response = yield AdminManager_1.default.findOne({ email: decodedValue.email });
                if (!(response === null || response === void 0 ? void 0 : response.emailLinkExpiry) ||
                    new Date(response.emailLinkExpiry) < new Date()) {
                    throw Error("Invalid link");
                }
                return decodedValue;
            }
            catch (err) {
                console.error(err);
                throw err;
            }
        });
    }
    forgetPassword(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield AdminManager_1.default.findOne({ email: params.email });
                if (!response) {
                    throw Error("Email not found");
                }
                const emailToken = yield Auth_1.default.createToken({
                    email: response.email,
                });
                let url = `${process.env.WEB_URL}resetPassword/${emailToken}`;
                let d1 = new Date();
                let d2 = new Date(d1);
                d2.setHours(d1.getHours() + 6);
                yield AdminManager_1.default.updateOne(response._id, { emailLinkExpiry: d2 });
                (0, Mailer_1.send)({
                    to: response.email,
                    subject: "Reset Password Link",
                    html: `
              <div>
                  Please reset your password by clicking <a href="${url}">here</a> or refer to ${url}
              </div>
          `,
                });
                return true;
            }
            catch (err) {
                console.error(err);
                throw err;
            }
        });
    }
    resetPassword(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const decodedValue = yield this.validateResetPasswordLink(data);
                let response = yield AdminManager_1.default.findOne({ email: decodedValue.email });
                const hash = yield Auth_1.default.hash(data.password);
                response = yield AdminManager_1.default.updateOne(response._id, { password: hash });
                return response;
            }
            catch (err) {
                console.log(err);
                throw err;
            }
        });
    }
}
exports.default = new AdminController();
