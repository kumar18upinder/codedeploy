import Joi from "joi";
import { CommonValidator, ListValidator } from "../../BaseValidator";

export const add = Joi.object({
    name: CommonValidator.string_required,
    code: CommonValidator.code,
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
    status: CommonValidator.status,
});

export const updateParam = Joi.object({
    id: CommonValidator.id,
});