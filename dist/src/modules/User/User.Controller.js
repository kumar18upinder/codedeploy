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
const User_Manager_1 = __importDefault(require("./User.Manager"));
const Auth_1 = __importDefault(require("../../lib/Auth"));
const Mailer_1 = require("../../lib/Mailer");
const LoginHistory_Manager_1 = __importDefault(require("../LoginHistory/LoginHistory.Manager"));
class User {
    signup(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let detail = yield User_Manager_1.default.detail({ email: data.email });
                if (detail) {
                    throw Error("Email already exists");
                }
                data.password = yield Auth_1.default.hash(data.password);
                const response = yield User_Manager_1.default.signup(data);
                const accessToken = yield Auth_1.default.createToken(response);
                yield User_Manager_1.default.login(response.email, accessToken);
                const userDetails = response.toObject();
                data.userId = userDetails._id;
                var d1 = new Date();
                var d2 = new Date(d1);
                d2.setHours(d1.getHours() + 6);
                data.emailLinkExpiry = d2;
                yield LoginHistory_Manager_1.default.login(Object.assign(Object.assign({}, data), { "device-id": "dummy" }));
                // let url = `${process.env.WEB_URL}onboarding`;
                let url = `${(data.Origin + '/') || process.env.WEB_URL}onboarding`;
                (0, Mailer_1.send)({
                    to: response.email,
                    subject: "Account verification email",
                    html: `
                    <div>
                        Please verify your email by clicking <a href="${url}">here</a> or refer to ${url}
                    </div>
                `,
                });
                return {
                    statusCode: 200,
                    message: "Verification email sent to email",
                    data: Object.assign(Object.assign({}, userDetails), { accessToken }),
                };
            }
            catch (err) {
                console.log(`Error : ${err}`);
                return {
                    statusCode: 400,
                    message: "Error",
                    data: err,
                };
            }
        });
    }
    login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response = yield User_Manager_1.default.detail({ email: data.email });
                if (!response) {
                    throw Error("Email not found");
                }
                const isPasswordValid = yield Auth_1.default.compare(data.password, response.password);
                if (!isPasswordValid) {
                    throw Error("Invalid Password");
                }
                response = response.toObject();
                const accessToken = yield Auth_1.default.createToken(response);
                return {
                    statusCode: 200,
                    message: "Login Successfull",
                    data: Object.assign(Object.assign({}, response), { accessToken }),
                };
            }
            catch (err) {
                console.log(`Error : ${err}`);
                return {
                    statusCode: 400,
                    message: "Error",
                    data: err,
                };
            }
        });
    }
    completeProfile(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield User_Manager_1.default.detail({ email: data.email });
                if (!response || !response.isEmailVerified) {
                    throw Error("Email not verified");
                }
                else if (response.isProfileCompleted) {
                    throw Error("Profile Already Completed");
                }
                if (data.phone) {
                    let isPhoneExist = yield User_Manager_1.default.isPhoneExist(response._id, data.phone);
                    if (isPhoneExist) {
                        throw Error("Phone number already associated with another account");
                    }
                }
                data.isProfileCompleted = true;
                yield User_Manager_1.default.update(response._id, data);
                return {
                    statusCode: 200,
                    message: "Success",
                };
            }
            catch (err) {
                console.log(`Error : ${err}`);
                return {
                    statusCode: 400,
                    message: "Error",
                    data: err,
                };
            }
        });
    }
    verifyEmail(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield User_Manager_1.default.detail({ _id: data.id });
                if (!response || !response.emailLinkExpiry || new Date(response.emailLinkExpiry) < new Date()) {
                    return {
                        statusCode: 400,
                        message: "Inavalid link"
                    };
                }
                yield User_Manager_1.default.update(data.id, { isEmailVerified: true });
                return {
                    statusCode: 200,
                    message: "Email Verified",
                };
            }
            catch (err) {
                console.log(`Error : ${err}`);
                return {
                    statusCode: 400,
                    message: "Error",
                    data: err,
                };
            }
        });
    }
    resenVerificationMail(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield User_Manager_1.default.detail({ email: params.email });
                if (!response) {
                    throw Error("Email not found");
                }
                let url = `${(params.Origin + '/') || process.env.WEB_URL}onboarding`;
                var d1 = new Date();
                var d2 = new Date(d1);
                d2.setHours(d1.getHours() + 6);
                yield User_Manager_1.default.update(String(response._id), { emailLinkExpiry: d2 });
                (0, Mailer_1.send)({
                    to: response.email,
                    subject: "Account verification email",
                    html: `
                    <div>
                        Please verify your email by clicking <a href="${url}">here</a> or refer to ${url}
                    </div>
                `,
                });
                return {
                    statusCode: 200,
                    message: "Verification email sent to email",
                };
            }
            catch (err) {
                console.log(`Error : ${err}`);
                return {
                    statusCode: 400,
                    message: "Error",
                    data: err,
                };
            }
        });
    }
    logout(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let detail = yield User_Manager_1.default.detail({ email: data.email });
                if (!detail) {
                    throw Error("Invalid User");
                }
                detail.userId = detail._id;
                yield LoginHistory_Manager_1.default.logout(data);
                return true;
            }
            catch (err) {
                console.error(err);
                throw err;
            }
        });
    }
}
exports.default = new User();
