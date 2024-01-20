import * as mongoose from "mongoose";
import CONSTANT from "../config/constants";

const schema = new mongoose.Schema({
    email : {
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
        type :String,
        required: false,
    },
    businessType: {
        type :String,
        enum: ["Restaurants", "Food Court", "Hotels", "Beach Kiosks", "Shows", "Sport Places"],
        required: false,
    },
    ownerFName: {
        type :String,
        required: false,
    },
    ownerLName: {
        type :String,
        required: false,
    },
    orgNumber : {
        type: String,
    },
    address : {
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
        enum: Object.values(CONSTANT.USER_TYPE),
        required: true,
    },
    status: {
        type: String,
        enum: Object.values(CONSTANT.MODEL_STATUS),
        default: CONSTANT.MODEL_STATUS.ACTIVE,
    },
    emailLinkExpiry: {
        type: Date,
        default: null,
    },
}, {
    timestamps: true,
    versionKey: false,
});

export default mongoose.model("Admin", schema);