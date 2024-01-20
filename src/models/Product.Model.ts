/**
 * imgUrl
 * Availability - enum
 * categoryId
 * name
 * type
 * calories
 * code
 * description
 * discount
 * price
 * finalPrice(discount + price)
 * characteristics Array
 * taxCode
 * extras [{
 *  groupName
 *  products Array
 *  isRequired
 * }]
 * modifiers [{
 *  groupName
 *  products
 * }]
 * 
 * multiple product images?
 */
import * as mongoose from "mongoose";
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
    categoryId: {
        type: mongoose.Types.ObjectId,
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
    calory: {
        type: mongoose.Schema.Types.Number,
        required: true,
    },
    code: {
        type: String,
        required: true,
        unique: true,
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
    characteristicIds: [{
        type: mongoose.Schema.Types.ObjectId,
    }],
    taxCode: [{
        type: mongoose.Schema.Types.ObjectId
    }],
    extras: [{
        groupName: {
            type: String
        },
        products: [{
            type: mongoose.Types.ObjectId
        }],
        isRequired: {
            type: Boolean
        }
    }],
    modifiers: [{
        groupName: {
            type: String
        },
        products: [{
            type: mongoose.Types.ObjectId
        }],
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

export default mongoose.model("Products", schema);