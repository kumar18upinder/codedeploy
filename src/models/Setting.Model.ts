import mongoose from "mongoose";
import constants from "../config/constants";

const schema = new mongoose.Schema({
    adminId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    data: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
    },
    status: {
        type: String,
        enum: Object.values(constants.MODEL_STATUS),
        default: constants.MODEL_STATUS.ACTIVE,
    },
}, {
    versionKey: false,
    timestamps: true,
});

schema.index({ adminId: 1, type: 1 });

export default mongoose.model("Setting", schema)