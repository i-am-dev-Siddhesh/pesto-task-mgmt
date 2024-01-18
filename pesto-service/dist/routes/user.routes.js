"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const general_controller_1 = require("../controllers/user/general.controller");
const auth_1 = require("../middlewares/auth");
const validate_1 = require("../middlewares/validate");
const auth_2 = require("../validations/auth");
const upload = (0, multer_1.default)({ dest: 'uploads/' });
const router = express_1.default.Router({ mergeParams: true });
router.route('/auth/me').get(auth_1.checkApiKey, general_controller_1.me);
router
    .route('/auth/signin')
    .post(auth_1.checkApiKey, (0, validate_1.validate)(auth_2.userLoginSchema), general_controller_1.userSignin);
router.route('/auth/signup').post(auth_1.checkApiKey, (0, validate_1.validate)(auth_2.userRegisterSchema), general_controller_1.userSignup);
router
    .route('/auth/update')
    .put(auth_1.checkApiKey, auth_1.checkToken, upload.single('image'), (0, validate_1.validate)(auth_2.userUpdateSchema), general_controller_1.userUpdateApi);
exports.default = router;
