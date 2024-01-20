import mongoose from "mongoose";
import { CONSTANT } from "../config";

const schema = new mongoose.Schema({
    adminId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    imgUrl: {
        type: String,
        required: true,
    },
    availability: {
        type: String,
        enum: Object.values(CONSTANT.PRODUCT.AVAILABILITY),
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
    description: {
        type: String,
    },
    discount: {
        type: mongoose.Schema.Types.Number
    },
    price: {
        type: mongoose.Schema.Types.Number,
        required: true,
    },
    finalPrice: {
        type: mongoose.Schema.Types.Number,
        required: true,
    },
    characteristic: {
        type: mongoose.Schema.Types.ObjectId
    },
    products: [{
        productId: {
            type: mongoose.Types.ObjectId
        }
    }],
    status: {
        type: String,
        enum: Object.values(CONSTANT.MODEL_STATUS),
        default: CONSTANT.MODEL_STATUS.ACTIVE,
    },
}, {
    versionKey: false,
    timestamps: true,
});

export default mongoose.model("Combo", schema);