import Joi from "joi";
import { CONSTANT } from "../../../config";
import { CommonValidator } from "../../BaseValidator";

export const add = Joi.object({
    method: Joi.string().trim().required().valid(
        ...Object.values(CONSTANT.SETTING.PAYMENT_TYPE)
    ),
    currency: Joi.string().trim().required().valid(
        ...Object.values(CONSTANT.SETTING.CURRENCY)
    ),
    vat: CommonValidator.string_required,
    fee: Joi.object({
        type: Joi.string().trim().required().valid(
            ...Object.values(CONSTANT.SETTING.SERVICE_FEE)
        ),
        value: Joi.number().precision(2).required()
    }),
    tips: CommonValidator.string_required,
});