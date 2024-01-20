import * as mongoose from "mongoose";
import constants from "../config/constants";

const schema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    "device-id": {
        type: String,
        default: null,
    },
    isLogin: {
        type: Boolean,
        default: true
    },
    type: {
        type: String,
        enum: Object.values(constants.USER_TYPE),
        required: true,
    },
}, {
    versionKey: false,
    timestamps: true,
});

schema.index({ userId: 1 });

export default mongoose.model("LoginHistory", schema);