import Joi from "joi";
import { CommonValidator, ListValidator } from "../../BaseValidator";
import { CONSTANT } from "../../../config";

export const list = Joi.object(ListValidator);

export const add = Joi.object({
    name: CommonValidator.string_required,
    code: CommonValidator.code,
    price: Joi.number().precision(2).optional(),
    url: CommonValidator.string_required,
    type: Joi.string().trim().required().valid(
        ...Object.values(CONSTANT.PRODUCT.TYPE)
    )
});

export const update = Joi.object({
    id: CommonValidator.id,
    name: CommonValidator.string_required,
    code: CommonValidator.code_optional,
    price: Joi.number().precision(2).optional(),
    url: CommonValidator.string_optional,
    type: Joi.string().trim().optional().valid(
        ...Object.values(CONSTANT.PRODUCT.TYPE)
    ),
    status: CommonValidator.status,
});

export const id = Joi.object(CommonValidator.id)