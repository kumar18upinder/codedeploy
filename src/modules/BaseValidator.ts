import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { CONSTANT } from "../config";

// Reusable validation middleware
export const validateInput = function (schema: any) {

    return (req: Request, res: Response, next: NextFunction) => {
        
        const validationResult = schema.validate({ ...req.body, ...req.params, ...req.query }, { abortEarly: false });

        if (validationResult.error) {
            const errorDetails = validationResult.error.details.map((error: any) => {
                return {
                    message: error.message,
                    path: error.path,
                };
            });

            const jsonError = {
                message: 'Validation error',
                details: errorDetails,
            };

            return res.status(CONSTANT.HTTP_CODE.ERROR).json(jsonError);
        }

        next(); // Move to the next middleware/route handler
    };
}

export const CommonValidator = {
    id: Joi.string().trim().required(),
    
    string_required: Joi.string().trim().required(),
    string_optional: Joi.string().trim().optional(),
    
    email: Joi.string().trim().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().trim()
        .min(CONSTANT.PASSWORD_LENGTH)
        .pattern(new RegExp(CONSTANT.REGEX.PASSWORD))
        .required()
        .messages({
        'string.min': CONSTANT.MESSAGES.ERROR.MIN_PASSWORD_LENGTH,
        'string.pattern.base': CONSTANT.MESSAGES.ERROR.PASSWORD_REGEX,
    }),
    
    code: Joi.string().trim().required().pattern(CONSTANT.REGEX.NO_SPACE)
    .messages({
        'string.pattern.base': CONSTANT.MESSAGES.ERROR.NO_SPACE_REGEX,
    }),
    code_optional: Joi.string().trim().optional().pattern(CONSTANT.REGEX.NO_SPACE)
    .messages({
        'string.pattern.base': CONSTANT.MESSAGES.ERROR.NO_SPACE_REGEX,
    }),

    status: Joi.string().trim().optional().valid(
        CONSTANT.MODEL_STATUS.ACTIVE,
        CONSTANT.MODEL_STATUS.DELETED,
        CONSTANT.MODEL_STATUS.BLOCKED,
    ),

    number_required: Joi.number().required(),
    number_optional: Joi.number().optional()
}

export const ListValidator = {
    pageNo: Joi.number().default(CONSTANT.QUERY.PAGE_NO),
    limit: Joi.number().default(CONSTANT.QUERY.LIMIT),
    sortOrder: Joi.string().trim().default(CONSTANT.QUERY.SORT_ORDER),
    sortBy: Joi.string().trim().default(CONSTANT.QUERY.SORT_BY),
    searchKey: Joi.string().trim().optional(),
};