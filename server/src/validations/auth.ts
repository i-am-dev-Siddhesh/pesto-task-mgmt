import Joi from 'joi';

export const userLoginSchema = Joi.object().keys({
  email: Joi.string().required().messages({
    'string.base': `Email should be a type of string`,
    'string.empty': `Email cannot be an empty field`,
    'any.required': `Email is a required field`,
  }),
  password: Joi.string().required().messages({
    'string.base': `Password should be a type of string`,
    'string.empty': `Password cannot be an empty field`,
    'any.required': `Password is a required field`,
  }),
});

export const userRegisterSchema = Joi.object().keys({
  email: Joi.string().required().messages({
    'string.base': `Email should be a type of string`,
    'string.empty': `Email cannot be an empty field`,
    'any.required': `Email is a required field`,
  }),
  password: Joi.string().required().messages({
    'string.base': `Password should be a type of string`,
    'string.empty': `Password cannot be an empty field`,
    'any.required': `Password is a required field`,
  }),
  name: Joi.string().required().max(100).messages({
    'string.base': `Name should be a type of string`,
    'string.empty': `Name cannot be an empty field`,
    'any.required': `Name is a required field`,
    'string.max': `Name can have a maximum length of {#limit}`,
  }),
});

export const userUpdateSchema = Joi.object().keys({
  name: Joi.string().max(100).messages({
    'string.base': `Name should be a type of string`,
    'string.empty': `Name cannot be an empty field`,
    'any.required': `Name is a required field`,
    'string.max': `Name can have a maximum length of {#limit}`,
  }),
  email: Joi.string().required().messages({
    'string.base': `Email should be a type of string`,
    'string.empty': `Email cannot be an empty field`,
    'any.required': `Email is a required field`,
  }),
});
