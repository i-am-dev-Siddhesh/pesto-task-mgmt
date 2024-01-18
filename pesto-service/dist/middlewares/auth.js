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
exports.checkToken = exports.checkApiKey = void 0;
const prisma_1 = require("../clients/prisma");
const auth_1 = require("../utils/auth");
const errorResponse_1 = require("../utils/errorResponse");
const checkApiKey = (req, res, next) => {
    var _a;
    try {
        const apiKey = process.env.API_KEY;
        if (!req.headers.apikey || ((_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.apikey) !== apiKey) {
            return res.status(403).json((0, errorResponse_1.forbiddenError)());
        }
        return next();
    }
    catch (error) {
        return res.status(500).json((0, errorResponse_1.generalError)(error));
    }
};
exports.checkApiKey = checkApiKey;
const checkToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authorization } = req.headers;
        if (!authorization || !authorization.startsWith('Bearer ')) {
            throw new Error('Unauthorized');
        }
        const idToken = authorization.split('Bearer ')[1];
        const decoded = (0, auth_1.decodeJWTToken)(idToken, 'user');
        const email = decoded === null || decoded === void 0 ? void 0 : decoded.email.replace('+91', '');
        const user = (yield prisma_1.prisma.user.findUnique({
            where: {
                email,
            },
        }));
        if (!user) {
            throw {
                message: 'User not found!!!',
            };
        }
        req.user = user;
        next();
    }
    catch (error) {
        return res.status(401).json((0, errorResponse_1.forbiddenError)());
    }
});
exports.checkToken = checkToken;
