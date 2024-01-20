"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
        index: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: false,
    },
    lastName: {
        type: String,
        required: false,
    },
    phone: {
        type: String,
        required: false,
    },
    dob: {
        type: String,
        required: false,
    },
    isProfileCompleted: {
        type: Boolean,
        default: false,
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    token: {
        type: String,
        default: null,
    },
    emailLinkExpiry: {
        type: Date,
        default: null,
    }
}, {
    versionKey: false,
    timestamps: true,
});
exports.default = mongoose_1.default.model("User", userSchema);
