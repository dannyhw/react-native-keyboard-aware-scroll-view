"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const KeyboardAwareHOC_1 = __importDefault(require("./KeyboardAwareHOC"));
exports.default = KeyboardAwareHOC_1.default(react_native_1.SectionList);
