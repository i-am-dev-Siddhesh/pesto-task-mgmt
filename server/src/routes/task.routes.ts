import express from 'express';
import multer from 'multer';
import {
  createTask,
  deleteTask,
  updateTask,
} from '../controllers/task/task.controller';
import { userSignin } from '../controllers/user/general.controller';
import { checkApiKey, checkToken } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { userLoginSchema } from '../validations/auth';
import {
  createTaskValidation,
  updateTaskValidation,
} from '../validations/task.validation';

const upload = multer({ dest: 'uploads/' });

const router = express.Router({ mergeParams: true });

router
  .route('/create')
  .post(checkApiKey, checkToken, validate(createTaskValidation), createTask);

router
  .route('/:taskId')
  .put(checkApiKey, checkToken, validate(updateTaskValidation), updateTask)
  .delete(checkApiKey, checkToken, deleteTask);

router
  .route('/auth/signin')
  .post(checkApiKey, validate(userLoginSchema), userSignin);

export default router;
