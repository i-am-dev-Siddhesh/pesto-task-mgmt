"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersTask = exports.getTask = exports.deleteTask = exports.updateTask = exports.createTask = void 0;
const prisma_1 = require("../../clients/prisma");
const errorResponse_1 = require("../../utils/errorResponse");
// @desc    Create Task
// @route   POST /v1/task/create
// @access  Protected
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, status, dueDate } = req.body;
        const user = req.user;
        const resp = yield prisma_1.prisma.task.create({
            data: {
                title,
                description,
                status,
                dueDate,
                userId: user.id,
            },
        });
        return res.json({
            success: true,
            data: resp,
        });
    }
    catch (error) {
        let statusCode = 500;
        if (error.statusCode) {
            statusCode = error.statusCode;
        }
        return res.status(statusCode).json((0, errorResponse_1.generalError)(error));
    }
});
exports.createTask = createTask;
// @desc    Update Task
// @route   PUT /v1/task/:taskId
// @access  Protected
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const user = req.user;
        const taskId = +req.params.taskId;
        console.log('taskId', taskId, "req.params", req.params.taskId);
        const resp = yield prisma_1.prisma.task.updateMany({
            data: Object.assign({}, data),
            where: {
                id: taskId,
                userId: user.id,
            },
        });
        return res.json({
            success: true,
            data: resp,
        });
    }
    catch (error) {
        let statusCode = 500;
        if (error.statusCode) {
            statusCode = error.statusCode;
        }
        return res.status(statusCode).json((0, errorResponse_1.generalError)(error));
    }
});
exports.updateTask = updateTask;
// @desc    Delete Task
// @route   Delete /v1/task/:taskId
// @access  Protected
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const taskId = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.taskId;
        const user = req === null || req === void 0 ? void 0 : req.user;
        const isExists = yield prisma_1.prisma.task.findMany({
            where: {
                userId: user === null || user === void 0 ? void 0 : user.id,
                id: +taskId,
            },
        });
        if ((isExists === null || isExists === void 0 ? void 0 : isExists.length) === 0) {
            throw {
                statusCode: 409,
                message: 'Task is not present',
            };
        }
        const resp = yield prisma_1.prisma.task.delete({
            where: {
                id: +taskId,
            },
        });
        return res.json({
            success: true,
            data: resp,
        });
    }
    catch (error) {
        let statusCode = 500;
        if (error.statusCode) {
            statusCode = error.statusCode;
        }
        return res.status(statusCode).json((0, errorResponse_1.generalError)(error));
    }
});
exports.deleteTask = deleteTask;
// @desc    GET Task
// @route   PUT /v1/task/:taskId
// @access  Protected
const getTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const user = req.user;
        const taskId = +req.params.taskId;
        const resp = yield prisma_1.prisma.task.findFirstOrThrow({
            where: {
                id: taskId,
                userId: user.id,
            },
        });
        return res.json({
            success: true,
            data: resp,
        });
    }
    catch (error) {
        let statusCode = 500;
        if (error.statusCode) {
            statusCode = error.statusCode;
        }
        return res.status(statusCode).json((0, errorResponse_1.generalError)(error));
    }
});
exports.getTask = getTask;
// @desc    GET users Task
// @route   PUT /v1/task/all
// @access  Protected
const getUsersTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const resp = yield prisma_1.prisma.task.findMany({
            where: {
                userId: user.id,
            },
        });
        return res.json({
            success: true,
            data: resp,
        });
    }
    catch (error) {
        let statusCode = 500;
        if (error.statusCode) {
            statusCode = error.statusCode;
        }
        return res.status(statusCode).json((0, errorResponse_1.generalError)(error));
    }
});
exports.getUsersTask = getUsersTask;
