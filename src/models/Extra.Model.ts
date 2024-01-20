import mongoose from "mongoose";
import { CONSTANT } from "../config";

const schema = new mongoose.Schema({
    adminId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: Object.values(CONSTANT.PRODUCT.TYPE),
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    price: {
        type: mongoose.Schema.Types.Number,
        required: true,
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

export default mongoose.model("Extra", schema); 