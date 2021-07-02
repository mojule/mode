"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSymbolicKey = exports.isOperationKey = exports.isSymbolicRoleKey = void 0;
const keys_1 = require("./keys");
const isSymbolicRoleKey = (value) => keys_1.symbolicRoleKeys.includes(value);
exports.isSymbolicRoleKey = isSymbolicRoleKey;
const isOperationKey = (value) => keys_1.operationKeys.includes(value);
exports.isOperationKey = isOperationKey;
const isSymbolicKey = (value) => keys_1.symbolicKeys.includes(value);
exports.isSymbolicKey = isSymbolicKey;
//# sourceMappingURL=predicates.js.map