import mongoose from "mongoose";
import { CONSTANT } from "../config";

const schema = new mongoose.Schema({
    adminId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    productId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    ingredients: [{
        rawMaterialId: mongoose.Types.ObjectId,
        qty: Number,
        waste: {
            valueType: {
                type: String,
                enum: Object.values(CONSTANT.VALUE_TYPE),
                required: true
            },
            value: Number
        }
    }],
    status: {
        type: String,
        enum: Object.values(CONSTANT.MODEL_STATUS),
        default: CONSTANT.MODEL_STATUS.ACTIVE
    },
}, {
    versionKey: false,
    timestamps: true,
});

export default mongoose.model("Recipe", schema);