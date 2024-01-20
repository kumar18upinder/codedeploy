import * as mongoose from "mongoose";
import constants from "../config/constants";

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: Object.values(constants.MODEL_STATUS),
        default: constants.MODEL_STATUS.ACTIVE,
    }
}, {
    versionKey: false,
    timestamps: true,
});

export default mongoose.model("Oraganisation", schema);