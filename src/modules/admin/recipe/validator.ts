import Joi from "joi"
import { CommonValidator, ListValidator } from "../../BaseValidator"
import { CONSTANT } from "../../../config";

export const list = Joi.object(ListValidator);

export const add = Joi.object({
    productId: CommonValidator.string_required,
    ingredients: [{
        rawMaterialId: CommonValidator.string_required,
        qty: Joi.string().trim().valid(
            ...Object.values(CONSTANT.VALUE_TYPE)
        ),
        waste: {
            valueType: CommonValidator.number_required,
            value: CommonValidator.number_required,
        }
    }]
});

export const update = Joi.object({
    id: CommonValidator.id,
    productId: CommonValidator.string_optional,
    ingredients: [{
        rawMaterialId: CommonValidator.string_optional,
        qty: CommonValidator.number_optional,
        waste: {
            valueType: Joi.string().trim().optional().valid(
                ...Object.values(CONSTANT.VALUE_TYPE)
            ),
            value: CommonValidator.number_optional,
        }
    }],
    status: Joi.string().trim().optional().valid(
        CONSTANT.MODEL_STATUS.ACTIVE,
        CONSTANT.MODEL_STATUS.DELETED,
        CONSTANT.MODEL_STATUS.BLOCKED,
    ),
});

export const id = Joi.object(CommonValidator.id);