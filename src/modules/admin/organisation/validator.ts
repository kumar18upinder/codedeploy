import Joi from "joi";
import constants from "../../../config/constants";
import { CommonValidator } from "../../BaseValidator";

export const add = Joi.object({
    email: CommonValidator.email,
    imageUrl: CommonValidator.string_optional,
    orgName: CommonValidator.string_required,
    businessType: CommonValidator.string_required,
    ownerFName: Joi.string().trim()
        .min(3)
        .alphanum()
        .required(),
    ownerLName: Joi.string().trim()
        .min(3)
        .alphanum()
        .required(),
    orgNumber: Joi.string().trim()
        .pattern(constants.REGEX.FIRST_NOT_SPECIAL_CHARACTER)
        .required()
        .messages({
            'string.pattern.base': constants.MESSAGES.ERROR.FIRST_NOT_SPECIAL_CHARACTER
        }),
    address: CommonValidator.string_required,
    country: CommonValidator.string_required,
    city: CommonValidator.string_required,
    state: CommonValidator.string_required,
    zipcode: CommonValidator.string_required,
    lang: CommonValidator.string_required,
    phone: CommonValidator.string_required,
    homeNumber: CommonValidator.string_required,
});