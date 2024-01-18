import express from 'express';
import multer from 'multer';
import {
  createTask,
  deleteTask,
  getTask,
  fetchUsersTask,
  updateTask,
} from '../controllers/task/task.controller';
import { userSignin } from '../controllers/user/general.controller';
import { checkApiKey, checkToken } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { userLoginSchema } from '../validations/auth';
import {
  createTaskValidation,
  fetchTasksValidation,
  updateTaskValidation,
} from '../validations/task.validation';

const upload = multer({ dest: 'uploads/' });

const router = express.Router({ mergeParams: true });

router
  .route('/create')
  .post(checkApiKey, checkToken, validate(createTaskValidation), createTask);
router
  .route('/all')
  .post(checkApiKey, checkToken, validate(fetchTasksValidation), fetchUsersTask);

router
  .route('/:taskId')
  .get(checkApiKey, checkToken, getTask)
  .put(checkApiKey, checkToken, validate(updateTaskValidation), updateTask)
  .delete(checkApiKey, checkToken, deleteTask);

export default router;
