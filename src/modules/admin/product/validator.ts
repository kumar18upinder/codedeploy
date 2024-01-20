import Joi from "joi";
import { CONSTANT } from "../../../config";
import { ListValidator } from "../../BaseValidator";

export const list = Joi.object(ListValidator);

export const add = Joi.object({
    code: Joi.string().trim().optional().pattern(/^[a-zA-Z0-9]+$/)
    .messages({
        'string.pattern.base': CONSTANT.MESSAGES.ERROR.NO_SPACE_SP_CHARACTER_REGEX,
    }),
    imgUrl: Joi.string().uri().trim().required(),
    availability: Joi.string().trim().required(),
    description: Joi.string().trim().optional(),
    categoryId: Joi.string().trim().required(),
    name: Joi.string().trim().required(),
    type: Joi.string().trim().required().valid(...Object.values(CONSTANT.PRODUCT.TYPE)),
    calory: Joi.number().precision(2).required(),
    discount: Joi.number().precision(2).required(),
    price: Joi.number().precision(2).required(),
    finalPrice: Joi.number().precision(2).required(),
    characteristicIds: Joi.array().items(Joi.string().trim()).min(1).required(),
    taxCode: Joi.array().items(Joi.string().trim().required().pattern(/^[a-zA-Z0-9]+$/)
    .messages({
        'string.pattern.base': CONSTANT.MESSAGES.ERROR.NO_SPACE_SP_CHARACTER_REGEX,
    })).min(1).required(),
    extras: Joi.array().items(
        Joi.object({
            groupName: Joi.string().trim().required(),
            products: Joi.array().items(Joi.string().trim()).min(1).required(),
            isRequired: Joi.boolean().default(false)
        })
    ).min(1).required(),
    modifiers: Joi.array().items(
        Joi.object({
            groupName: Joi.string().trim().required(),
            products: Joi.array().items(Joi.string().trim()).min(1).required(),
        })
    ).min(1).required(),
    status: Joi.string().trim().optional().valid(
        CONSTANT.MODEL_STATUS.ACTIVE,
        CONSTANT.MODEL_STATUS.DELETED,
        CONSTANT.MODEL_STATUS.BLOCKED,
    ),
});

export const detail = Joi.object({
    id: Joi.string().trim().required(),
});

export const remove = Joi.object({
    id: Joi.string().trim().required(),
});

export const update = Joi.object({
    id: Joi.string().trim().required(),
    code: Joi.string().trim().optional().pattern(/^[a-zA-Z0-9]+$/)
    .messages({
        'string.pattern.base': CONSTANT.MESSAGES.ERROR.NO_SPACE_SP_CHARACTER_REGEX,
    }),
    imgUrl: Joi.string().uri().trim().optional(),
    availability: Joi.string().trim().optional(),
    description: Joi.string().trim().optional(),
    categoryId: Joi.string().trim().optional(),
    name: Joi.string().trim().optional(),
    type: Joi.string().trim().optional().valid(...Object.values(CONSTANT.PRODUCT.TYPE)),
    calory: Joi.number().precision(2).optional(),
    discount: Joi.number().precision(2).optional(),
    price: Joi.number().precision(2).optional(),
    finalPrice: Joi.number().precision(2).optional(),
    characteristicIds: Joi.array().items(Joi.string().trim()).min(1).optional(),
    taxCode: Joi.array().items(Joi.string().trim().optional().pattern(/^[a-zA-Z0-9]+$/)
    .messages({
        'string.pattern.base': CONSTANT.MESSAGES.ERROR.NO_SPACE_SP_CHARACTER_REGEX,
    })).min(1).optional(),
    extras: Joi.array().items(
        Joi.object({
            groupName: Joi.string().trim().optional(),
            products: Joi.array().items(Joi.string().trim()).min(1).optional(),
            isRequired: Joi.boolean().default(false)
        })
    ).min(1).optional(),
    modifiers: Joi.array().items(
        Joi.object({
            groupName: Joi.string().trim().optional(),
            products: Joi.array().items(Joi.string().trim()).min(1).optional(),
        })
    ).min(1).optional(),
    status: Joi.string().trim().optional().valid(
        CONSTANT.MODEL_STATUS.ACTIVE,
        CONSTANT.MODEL_STATUS.DELETED,
        CONSTANT.MODEL_STATUS.BLOCKED,
    ),
});