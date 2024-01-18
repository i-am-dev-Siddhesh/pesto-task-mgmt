"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchTasksValidation = exports.deleteTaskValidation = exports.updateTaskValidation = exports.createTaskValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createTaskValidation = joi_1.default.object().keys({
    title: joi_1.default.string().required().messages({
        'string.base': `Title should be a type of string`,
        'string.empty': `Title cannot be an empty field`,
        'any.required': `Title is a required field`,
    }),
    description: joi_1.default.string().required().messages({
        'string.base': `Description should be a type of string`,
        'string.empty': `Description cannot be an empty field`,
        'any.required': `Description is a required field`,
    }),
    status: joi_1.default.string()
        .valid('to_do', 'in_progress', 'done')
        .required()
        .messages({
        'string.base': `Status should be a type of string`,
        'string.empty': `Status cannot be an empty field`,
        'any.required': `Status is a required field`,
        'any.only': `Status must be one of 'To Do', 'In Progress', 'Done'`,
    }),
    dueDate: joi_1.default.date().iso().allow(null).messages({
        'date.base': `Due date should be a valid date`,
        'date.format': `Due date should be in ISO format`,
    }),
});
exports.updateTaskValidation = joi_1.default.object().keys({
    title: joi_1.default.string().messages({
        'string.base': `Title should be a type of string`,
        'string.empty': `Title cannot be an empty field`,
    }),
    description: joi_1.default.string().messages({
        'string.base': `Description should be a type of string`,
        'string.empty': `Description cannot be an empty field`,
    }),
    status: joi_1.default.string().valid('to_do', 'in_progress', 'done').messages({
        'string.base': `Status should be a type of string`,
        'any.only': `Status must be one of 'To Do', 'In Progress', 'Done'`,
    }),
    dueDate: joi_1.default.date().iso().allow(null).messages({
        'date.base': `Due date should be a valid date`,
        'date.format': `Due date should be in ISO format`,
    }),
});
exports.deleteTaskValidation = joi_1.default.object().keys({
    taskId: joi_1.default.number().integer().positive().required().messages({
        'number.base': `Task ID should be a type of number`,
        'number.integer': `Task ID should be an integer`,
        'number.positive': `Task ID should be a positive number`,
        'any.required': `Task ID is a required field`,
    }),
});
exports.fetchTasksValidation = joi_1.default.object().keys({
    title: joi_1.default.string().messages({
        'string.base': `Title should be a type of string`,
        'string.empty': `Title cannot be an empty field`,
        'any.required': `Title is a required field`,
    }),
    description: joi_1.default.string().messages({
        'string.base': `Description should be a type of string`,
        'string.empty': `Description cannot be an empty field`,
        'any.required': `Description is a required field`,
    }),
    status: joi_1.default.string().valid('to_do', 'in_progress', 'done').messages({
        'string.base': `Status should be a type of string`,
        'string.empty': `Status cannot be an empty field`,
        'any.required': `Status is a required field`,
        'any.only': `Status must be one of 'To Do', 'In Progress', 'Done'`,
    }),
    dueDate: joi_1.default.date().iso().allow(null).messages({
        'date.base': `Due date should be a valid date`,
        'date.format': `Due date should be in ISO format`,
    }),
    orderBy: joi_1.default.string().valid('asc', 'desc').messages({
        'string.base': `Order should be a type of string`,
        'string.empty': `Order cannot be an empty field`,
        'any.required': `Order is a required field`,
        'any.only': `Order must be one of 'Ascending'or 'Descending'`,
    }),
});
