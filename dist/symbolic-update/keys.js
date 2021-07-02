"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.symbolicKeys = exports.separatorKey = exports.equalsKey = exports.minusKey = exports.plusKey = exports.operationKeys = exports.allKey = exports.symbolicRoleKeys = void 0;
const keys_1 = require("../core/keys");
const all = 'a';
const symbolicRoles = [keys_1.userKey, keys_1.groupKey, keys_1.otherKey, all];
exports.symbolicRoleKeys = Object.freeze(symbolicRoles);
exports.allKey = all;
// ---
const plus = '+';
const minus = '-';
const equals = '=';
const operations = [plus, minus, equals];
exports.operationKeys = Object.freeze(operations);
exports.plusKey = plus;
exports.minusKey = minus;
exports.equalsKey = equals;
// ---
const separator = ',';
exports.separatorKey = separator;
// ---
exports.symbolicKeys = Object.freeze([...exports.symbolicRoleKeys, ...exports.operationKeys, ...keys_1.permKeys]);
//# sourceMappingURL=keys.js.map