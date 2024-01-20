import Joi from "joi";
import constants from "../../../config/constants";
import { CommonValidator } from "../../BaseValidator";

export const validateApproveOrg = Joi.object({
    orgId: CommonValidator.id,
});
export const validateApproveOrgBody = Joi.object({
    type: Joi.string().trim().valid(constants.MODEL_STATUS.ACTIVE, constants.MODEL_STATUS.REJECTED).required(),
}).unknown(true);

export const validateOrgStatus = Joi.object({
    id: CommonValidator.id,
});

export const validateLoginOrg = Joi.object({
    email: CommonValidator.email,
    password: CommonValidator.string_required,
});

export const add = Joi.object({
    email: CommonValidator.email,
    password: CommonValidator.password,
});