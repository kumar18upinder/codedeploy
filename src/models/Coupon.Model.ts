import mongoose from "mongoose";
import { CONSTANT } from "../config";

const schema = new mongoose.Schema({
    adminId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    type: {
        type: String,
        enum: Object.values(CONSTANT.VALUE_TYPE),
        required: true,
    },
    discount: {
        type: Number,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    min_value: {
        type: Number,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: Object.values(CONSTANT.MODEL_STATUS),
        default: CONSTANT.MODEL_STATUS.ACTIVE,
    },
}, {
    versionKey: false,
    timestamps: true,
});

export default mongoose.model("Coupon", schema);