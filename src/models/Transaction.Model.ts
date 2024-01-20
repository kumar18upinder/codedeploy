import mongoose from "mongoose";
import { CONSTANT } from "../config";

let schema = new mongoose.Schema({
    adminId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    name: {
        type: String,
        unique: true,
        required: true,
    },
    code: {
        type: String,
        unique: true,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    transaction_status: {
        type: String,
        enum: Object.values(CONSTANT.TRANSACTION_STATUS),
        default: CONSTANT.TRANSACTION_STATUS.IN
    },
    status: {
        type: String,
        enum: [
            CONSTANT.MODEL_STATUS.ACTIVE,
            CONSTANT.MODEL_STATUS.DELETED,
        ],
        default: CONSTANT.MODEL_STATUS.ACTIVE
    }
}, {
    versionKey: false,
    timestamps: true
});

export default mongoose.model("Transaction", schema);