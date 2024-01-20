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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __importStar(require("mongoose"));
const constants_1 = __importDefault(require("../config/constants"));
const schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        index: true,
    },
    password: {
        type: String,
        required: false,
    },
    imageUrl: {
        type: String,
        required: false,
    },
    orgName: {
        type: String,
        required: false,
    },
    businessType: {
        type: String,
        enum: ["Restaurants", "Food Court", "Hotels", "Beach Kiosks", "Shows", "Sport Places"],
        required: false,
    },
    ownerFName: {
        type: String,
        required: false,
    },
    ownerLName: {
        type: String,
        required: false,
    },
    orgNumber: {
        type: String,
    },
    address: {
        type: String,
    },
    country: {
        type: String,
    },
    state: {
        type: String,
    },
    city: {
        type: String,
    },
    zipcode: {
        type: String,
    },
    lang: {
        type: String,
        enum: ["English", "Spanish", "Swedish"]
    },
    phone: {
        type: String,
    },
    homeNumber: {
        type: String
    },
    type: {
        type: String,
        enum: Object.values(constants_1.default.USER_TYPE),
        required: true,
    },
    status: {
        type: String,
        enum: Object.values(constants_1.default.MODEL_STATUS),
        default: constants_1.default.MODEL_STATUS.ACTIVE,
    },
    emailLinkExpiry: {
        type: Date,
        default: null,
    },
}, {
    timestamps: true,
    versionKey: false,
});
exports.default = mongoose.model("Admin", schema);
