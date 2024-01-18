"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateNanoId = exports.isObjectEmpty = void 0;
const nanoid_1 = require("nanoid");
const isObjectEmpty = (obj) => {
    return Object.getOwnPropertyNames(obj).length === 0;
};
exports.isObjectEmpty = isObjectEmpty;
const generateNanoId = () => {
    return (0, nanoid_1.nanoid)();
};
exports.generateNanoId = generateNanoId;
