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
exports.sendOrgAccountRejectMail = exports.sendOrgWelcomeMail = exports.sendOrgOnboardRequestMail = exports.send = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const mailHost = process.env.MAIL_HOST;
const mailPort = process.env.MAIL_PORT;
const mailUser = process.env.MAIL_USER;
const mailPass = process.env.MAIL_PASS;
const transport = nodemailer_1.default.createTransport({
    host: mailHost,
    port: Number(mailPort),
    auth: {
        user: mailUser,
        pass: mailPass
    }
});
const send = function (payload) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        return transport
            .sendMail({
            from: (_a = process.env.ADMIN_EMAIL) !== null && _a !== void 0 ? _a : "pankaj_test1@yopmail.com",
            to: (_b = payload.to) !== null && _b !== void 0 ? _b : "pankaj_test1@yopmail.com",
            subject: payload.subject,
            // text: "Hello world?", // plain text body
            html: payload.html, // html body
        })
            .then(() => console.log("Success"))
            .catch((err) => console.log(`Error : ${err}`));
    });
};
exports.send = send;
const sendOrgOnboardRequestMail = function (payload) {
    return __awaiter(this, void 0, void 0, function* () {
        payload.subject = "Organisation Account Approval Request";
        payload.html = `
    <div>
      Organisation approval request received with following details:
      </br>
      <div>
        <div> <b> Name: </b> ${payload.orgName}</div>
        <div> <b> Type: </b> ${payload.businessType}</div>
        <div> <b> Organisation Number: </b> ${payload.orgNumber}</div>
        <div> <b> Owner Name: </b> ${payload.ownerFName} ${payload.ownerLName}</div>
      </div>
      </br>
      Thanks
    </div>
  `;
        return (0, exports.send)(payload);
    });
};
exports.sendOrgOnboardRequestMail = sendOrgOnboardRequestMail;
const sendOrgWelcomeMail = function (payload) {
    return __awaiter(this, void 0, void 0, function* () {
        payload.subject = "Account Approved";
        payload.html = `
    <div>
      Organisation account approved. Please use following credentials to log in:
      </br>
      <div>
        <div> <b> Email: </b> ${payload.email}</div>
        <div> <b> Password: </b> ${payload.password}</div>
      </div>
      </br>
      Thanks
    </div>
  `;
        return (0, exports.send)(payload);
    });
};
exports.sendOrgWelcomeMail = sendOrgWelcomeMail;
const sendOrgAccountRejectMail = function (payload) {
    return __awaiter(this, void 0, void 0, function* () {
        payload.subject = "Account Rejected";
        payload.html = `
    <div>
      Your account has been rejected due to application's internal policy. Please contact admin for further  details.
      </br>
      </br>
      Thanks
    </div>
  `;
        return (0, exports.send)(payload);
    });
};
exports.sendOrgAccountRejectMail = sendOrgAccountRejectMail;
