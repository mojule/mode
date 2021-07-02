"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasRequestBit = exports.clearBit = exports.setBit = exports.getBit = exports.hasBit = void 0;
const masks_1 = require("./masks");
const hasBit = (role, perm, mode) => exports.getBit(role, perm, mode) !== 0;
exports.hasBit = hasBit;
const getBit = (role, perm, mode) => mode & masks_1.rolePermMasks[role][perm];
exports.getBit = getBit;
const setBit = (role, perm, mode) => mode | masks_1.rolePermMasks[role][perm];
exports.setBit = setBit;
const clearBit = (role, perm, mode) => mode & ~masks_1.rolePermMasks[role][perm];
exports.clearBit = clearBit;
const hasRequestBit = (perm, requestMode) => (requestMode & masks_1.accessMasks[perm]) !== 0;
exports.hasRequestBit = hasRequestBit;
//# sourceMappingURL=index.js.map