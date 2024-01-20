import * as mongoose from "mongoose";
import { CONSTANT } from "../config";

const schema = new mongoose.Schema({
    adminId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
        index: true,
        unique: true,
    },
    uom: {
        type: String,
        enum: ["Units"],
        default: "Units"
    },
    cost: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: Object.values(CONSTANT.MODEL_STATUS),
        default: CONSTANT.MODEL_STATUS.ACTIVE
    }
}, {
    versionKey: false,
    timestamps: true,
});

export default mongoose.model("raw_material", schema);