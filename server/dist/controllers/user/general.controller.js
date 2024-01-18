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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.me = exports.userUpdateApi = exports.userSignin = exports.userSignup = void 0;
const argon2_1 = __importDefault(require("argon2"));
const prisma_1 = require("../../clients/prisma");
const s3_1 = require("../../clients/s3");
const messages_1 = require("../../constants/messages");
const auth_1 = require("../../utils/auth");
const errorResponse_1 = require("../../utils/errorResponse");
// @desc    User sign up
// @route   POST /v1/user/auth/signup
// @access  Public
const userSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const isExistingUser = yield prisma_1.prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (isExistingUser) {
            throw {
                statusCode: 409,
                message: 'User already exists',
            };
        }
        const passwordHash = yield argon2_1.default.hash(password);
        const createdUser = yield prisma_1.prisma.user.create({
            data: {
                email,
                name,
                password: passwordHash,
            },
        });
        yield prisma_1.prisma.task.create({
            data: {
                userId: createdUser.id,
            },
        });
        const { token, expirationTime } = (0, auth_1.createJWTToken)({ id: createdUser.id, email: createdUser.email }, 'user');
        return res.json({
            success: true,
            message: 'Registration successful',
            data: createdUser,
            token,
            expirationTime,
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
exports.userSignup = userSignup;
// @desc    User sign in
// @route   POST /v1/user/auth/signin
// @access  Public
const userSignin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password, email } = req.body;
        const isExistingUser = yield prisma_1.prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (!isExistingUser) {
            throw {
                message: 'Login Failed',
            };
        }
        const passwordHash = isExistingUser.password;
        const passwordMatches = yield argon2_1.default.verify(passwordHash, password);
        if (!passwordMatches) {
            throw {
                message: 'Login Failed',
            };
        }
        const { token, expirationTime } = (0, auth_1.createJWTToken)({ id: isExistingUser.id, email: isExistingUser.email }, 'user');
        return res.json({
            success: true,
            message: 'Signin successful',
            data: isExistingUser,
            token,
            expirationTime,
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
exports.userSignin = userSignin;
// @desc    Update User profile
// @route   PUT /v1/user/update
// @access  protected
const userUpdateApi = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let data = req.body;
        const author = req.user;
        console.log('author', author);
        const user = yield prisma_1.prisma.user.findUnique({
            where: {
                id: author.id,
            },
        });
        if (!user) {
            throw {
                statusCode: 404,
                message: messages_1.USER_MISSING,
            };
        }
        if (req.file) {
            const user = yield prisma_1.prisma.user.findUnique({
                where: {
                    id: +author.id,
                },
            });
            if ((_a = user === null || user === void 0 ? void 0 : user.profile_url) === null || _a === void 0 ? void 0 : _a.includes(process.env.AWS_S3_BUCKET_NAME)) {
                yield (0, s3_1.deleteObjectFromS3)(user === null || user === void 0 ? void 0 : user.profile_url);
            }
            const result = yield (0, s3_1.uploadToS3)(req.file);
            data.profile_url = result.Location;
        }
        if (data.password) {
            const hash = yield argon2_1.default.hash(data.password);
            delete data.passwordConfirmation;
            data.password = hash;
        }
        const resp = yield prisma_1.prisma.user.update({
            where: {
                id: author === null || author === void 0 ? void 0 : author.id,
            },
            data,
        });
        return res.status(200).json({
            status: true,
            data: resp,
        });
    }
    catch (error) {
        console.log(error);
        let statusCode = 500;
        if (error.statusCode) {
            statusCode = error.statusCode;
        }
        return res.status(statusCode).json((0, errorResponse_1.generalError)(error));
    }
});
exports.userUpdateApi = userUpdateApi;
// @desc    GET User
// @route   GET /v1/user/auth/me
// @access  Protected
const me = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authorization, Authorization } = req.headers;
        console.log('authorization', authorization);
        console.log('Authorization', Authorization);
        if (!authorization || !authorization.startsWith('Bearer ')) {
            throw new Error('Unauthorized');
        }
        const idToken = authorization.split('Bearer ')[1];
        const decoded = (0, auth_1.decodeJWTToken)(idToken, 'user');
        const email = decoded === null || decoded === void 0 ? void 0 : decoded.email;
        const user = yield prisma_1.prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (user) {
            return res.status(200).json({ status: true, data: user });
        }
        else {
            throw Error('No User found');
        }
    }
    catch (error) {
        let statusCode = 500;
        if (error.status_code) {
            statusCode = error.status_code;
        }
        return res.status(statusCode).json((0, errorResponse_1.generalError)(error));
    }
});
exports.me = me;
