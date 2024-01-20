import Joi from "joi";
import { CommonValidator, ListValidator } from "../../BaseValidator";

export const list = Joi.object(ListValidator);

export const add = Joi.object({
    code: CommonValidator.code,
    value: CommonValidator.string_required,
    description: CommonValidator.string_required,
});

export const detail = Joi.object({
    id: CommonValidator.id,
});

export const remove = Joi.object({
    id: CommonValidator.id,
});
export const update = Joi.object({
    id: CommonValidator.id,
    value: CommonValidator.string_optional,
    code: CommonValidator.code_optional,
    description: CommonValidator.string_optional,
});

export const updateParam = Joi.object({
    id: CommonValidator.id,
});