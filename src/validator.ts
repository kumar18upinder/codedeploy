import Joi from "joi";

export const headerValidate = Joi.object({
  "device-id": Joi.string().optional(),
});

export const login = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export const signup = Joi.object({
  email: Joi.string().trim().required(),
  password: Joi.string().trim().length(8).required(),
});

export const completeProfile = Joi.object({
  firstName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
  phone: Joi.string().trim().required(),
  dob: Joi.string().trim(),
});

export const verifyEmail = Joi.object({
  id: Joi.string().required(),
});

export const addThread = Joi.object({
  title: Joi.string().trim().required(),
});

export const updateThread = Joi.object({
  title: Joi.string().trim().required(),
  id: Joi.string().trim().required(),
});

export const deletedThread = Joi.object({
  id: Joi.string().trim().required(),
});

export const addChat = Joi.object({
  threadId: Joi.string().trim().optional(),
  question: Joi.string().trim().required(),
  answer: Joi.string().trim().required(),
});

export const getThreadDetails = Joi.object({
  id: Joi.string().trim().required(),
});
