"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const general_controller_1 = require("../controllers/general.controller");
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const auth_1 = require("../middlewares/auth");
const upload = (0, multer_1.default)({ dest: 'uploads/' });
const router = express_1.default.Router({ mergeParams: true });
router.route('/').get(auth_1.checkApiKey, general_controller_1.checkServerHealth);
exports.default = router;
