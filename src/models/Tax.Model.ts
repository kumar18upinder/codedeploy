import * as mongoose from "mongoose";
import constants from "../config/constants";

const schema = new mongoose.Schema({
    adminId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    element: [{
        type: String
    }],
    status: {
        type: String,
        enum: Object.values(constants.MODEL_STATUS),
        default: constants.MODEL_STATUS.ACTIVE,
    }
}, {
    versionKey: false,
    timestamps: true
});

export default mongoose.model("Tax", schema);