import Joi from "joi";
import { CommonValidator, ListValidator } from "../../BaseValidator";

export const add = Joi.object({
    name: CommonValidator.string_required,
    code: CommonValidator.code,
    cost: Joi.number().precision(2).required(),
    uom: CommonValidator.string_required,
    description: CommonValidator.string_optional,
});

export const list = Joi.object(ListValidator);

export const detail = Joi.object({
    id: CommonValidator.id,
});

export const remove = Joi.object({
    id: CommonValidator.id,
});

export const update = Joi.object({
    id: CommonValidator.id,
    name: CommonValidator.string_optional,
    code: CommonValidator.code_optional,
    cost: Joi.number().precision(2).optional(),
    uom: CommonValidator.string_optional,
    description: CommonValidator.string_optional,
    status: CommonValidator.status,
});

export const updateParam = Joi.object({
    id: CommonValidator.id,
});