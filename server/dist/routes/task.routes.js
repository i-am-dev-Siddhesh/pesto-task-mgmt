"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const task_controller_1 = require("../controllers/task/task.controller");
const auth_1 = require("../middlewares/auth");
const validate_1 = require("../middlewares/validate");
const task_validation_1 = require("../validations/task.validation");
const upload = (0, multer_1.default)({ dest: 'uploads/' });
const router = express_1.default.Router({ mergeParams: true });
router
    .route('/create')
    .post(auth_1.checkApiKey, auth_1.checkToken, (0, validate_1.validate)(task_validation_1.createTaskValidation), task_controller_1.createTask);
router
    .route('/all')
    .post(auth_1.checkApiKey, auth_1.checkToken, (0, validate_1.validate)(task_validation_1.fetchTasksValidation), task_controller_1.fetchUsersTask);
router
    .route('/:taskId')
    .get(auth_1.checkApiKey, auth_1.checkToken, task_controller_1.getTask)
    .put(auth_1.checkApiKey, auth_1.checkToken, (0, validate_1.validate)(task_validation_1.updateTaskValidation), task_controller_1.updateTask)
    .delete(auth_1.checkApiKey, auth_1.checkToken, task_controller_1.deleteTask);
exports.default = router;
