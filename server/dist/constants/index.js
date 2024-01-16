"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.otpExpireSeconds = exports.subscriptionEndDate = exports.subscriptionValidTime = exports.signedUrlExp = exports.refreshTokenExp = exports.tokenExp = exports.tokenKey = exports.SERVER_RUNNING_MESSAGE = exports.GENERAL_ERROR_MESSAGE = exports.NOT_AUTHENTICATED_MESSAGE = exports.ACCESS_DENIED_MESSAGE = exports.__prod__ = void 0;
exports.__prod__ = process.env.SERVER_ENV === 'production';
exports.ACCESS_DENIED_MESSAGE = 'Access to the resource is denied', exports.NOT_AUTHENTICATED_MESSAGE = 'You are not authenticated to perform this action', exports.GENERAL_ERROR_MESSAGE = 'Something went wrong', exports.SERVER_RUNNING_MESSAGE = 'Server is in running state';
exports.tokenKey = 'qid', exports.tokenExp = 1000 * 60 * 60 * 24, exports.refreshTokenExp = 1000 * 60 * 60 * 24 * 60; // 30 days
exports.signedUrlExp = 600; // seconds
exports.subscriptionValidTime = 7 * 24 * 60 * 60 * 1000, exports.subscriptionEndDate = new Date(Date.now() + exports.subscriptionValidTime).toUTCString();
exports.otpExpireSeconds = 300; // 5mins
