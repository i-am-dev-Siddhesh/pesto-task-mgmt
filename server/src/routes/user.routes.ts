import express from 'express';
import multer from 'multer';
import {
  me,
  userSignin,
  userSignup,
  userUpdateApi,
} from '../controllers/user/general.controller';
import { checkApiKey, checkToken } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { userLoginSchema, userRegisterSchema, userUpdateSchema } from '../validations/auth';

const upload = multer({ dest: 'uploads/' });

const router = express.Router({ mergeParams: true });

router.route('/auth/me').get(checkApiKey, me);
router
  .route('/auth/signin')
  .post(checkApiKey, validate(userLoginSchema), userSignin);
router.route('/auth/signup').post(checkApiKey, validate(userRegisterSchema), userSignup);

router
  .route('/auth/update')
  .put(
    checkApiKey,
    checkToken,
    upload.single('image'),
    validate(userUpdateSchema),
    userUpdateApi
  );

export default router;
