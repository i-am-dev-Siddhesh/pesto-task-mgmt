import Joi from 'joi';

export const createTaskValidation = Joi.object().keys({
  title: Joi.string().required().messages({
    'string.base': `Title should be a type of string`,
    'string.empty': `Title cannot be an empty field`,
    'any.required': `Title is a required field`,
  }),
  description: Joi.string().required().messages({
    'string.base': `Description should be a type of string`,
    'string.empty': `Description cannot be an empty field`,
    'any.required': `Description is a required field`,
  }),

  status: Joi.string()
    .valid('to_do', 'in_progress', 'done')
    .required()
    .messages({
      'string.base': `Status should be a type of string`,
      'string.empty': `Status cannot be an empty field`,
      'any.required': `Status is a required field`,
      'any.only': `Status must be one of 'To Do', 'In Progress', 'Done'`,
    }),
  dueDate: Joi.date().iso().allow(null).messages({
    'date.base': `Due date should be a valid date`,
    'date.format': `Due date should be in ISO format`,
  }),
});

export const updateTaskValidation = Joi.object().keys({
  title: Joi.string().messages({
    'string.base': `Title should be a type of string`,
    'string.empty': `Title cannot be an empty field`,
  }),
  description: Joi.string().messages({
    'string.base': `Description should be a type of string`,
    'string.empty': `Description cannot be an empty field`,
  }),
  status: Joi.string().valid('to_do', 'in_progress', 'done').messages({
    'string.base': `Status should be a type of string`,
    'any.only': `Status must be one of 'To Do', 'In Progress', 'Done'`,
  }),
  dueDate: Joi.date().iso().allow(null).messages({
    'date.base': `Due date should be a valid date`,
    'date.format': `Due date should be in ISO format`,
  }),
});

export const deleteTaskValidation = Joi.object().keys({
  taskId: Joi.number().integer().positive().required().messages({
    'number.base': `Task ID should be a type of number`,
    'number.integer': `Task ID should be an integer`,
    'number.positive': `Task ID should be a positive number`,
    'any.required': `Task ID is a required field`,
  }),
});

export const fetchTasksValidation = Joi.object().keys({
  title: Joi.string().messages({
    'string.base': `Title should be a type of string`,
    'string.empty': `Title cannot be an empty field`,
    'any.required': `Title is a required field`,
  }),
  description: Joi.string().messages({
    'string.base': `Description should be a type of string`,
    'string.empty': `Description cannot be an empty field`,
    'any.required': `Description is a required field`,
  }),

  status: Joi.string().valid('to_do', 'in_progress', 'done').messages({
    'string.base': `Status should be a type of string`,
    'string.empty': `Status cannot be an empty field`,
    'any.required': `Status is a required field`,
    'any.only': `Status must be one of 'To Do', 'In Progress', 'Done'`,
  }),
  dueDate: Joi.date().iso().allow(null).messages({
    'date.base': `Due date should be a valid date`,
    'date.format': `Due date should be in ISO format`,
  }),
  orderBy: Joi.string().valid('asc', 'desc').messages({
    'string.base': `Order should be a type of string`,
    'string.empty': `Order cannot be an empty field`,
    'any.required': `Order is a required field`,
    'any.only': `Order must be one of 'Ascending'or 'Descending'`,
  }),
});
