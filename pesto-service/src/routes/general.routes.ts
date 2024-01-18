import { checkServerHealth } from '../controllers/general.controller';

import express from 'express';
import multer from 'multer';
import { checkApiKey } from '../middlewares/auth';

const upload = multer({ dest: 'uploads/' });

const router = express.Router({ mergeParams: true });

router.route('/').get(checkApiKey, checkServerHealth);

export default router;
