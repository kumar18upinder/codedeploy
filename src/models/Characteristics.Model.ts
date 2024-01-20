import * as mongoose from "mongoose";``
import constants from "../config/constants";

const schema = new mongoose.Schema({
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
    status: {
        type: String,
        enum: [
            constants.MODEL_STATUS.ACTIVE,
            constants.MODEL_STATUS.BLOCKED,
            constants.MODEL_STATUS.DELETED,
        ],
        default: constants.MODEL_STATUS.ACTIVE
    }
}, {
    versionKey: false,
    timestamps: true,
});

export default mongoose.model("Characteristics", schema);