"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRoleKey = exports.isPermKey = void 0;
const keys_1 = require("./keys");
const isPermKey = (value) => keys_1.permKeys.includes(value);
exports.isPermKey = isPermKey;
const isRoleKey = (value) => keys_1.roleKeys.includes(value);
exports.isRoleKey = isRoleKey;
//# sourceMappingURL=predicates.js.map