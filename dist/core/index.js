"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasRequestBit = exports.clearBit = exports.setBit = exports.getBit = exports.hasBit = void 0;
const masks_1 = require("./masks");
const hasBit = (mode, role, perm) => exports.getBit(mode, role, perm) !== 0;
exports.hasBit = hasBit;
const getBit = (mode, role, perm) => mode & masks_1.rolePermMasks[role][perm];
exports.getBit = getBit;
const setBit = (mode, role, perm) => mode | masks_1.rolePermMasks[role][perm];
exports.setBit = setBit;
const clearBit = (mode, role, perm) => mode & ~masks_1.rolePermMasks[role][perm];
exports.clearBit = clearBit;
const hasRequestBit = (requestMode, perm) => (requestMode & masks_1.accessMasks[perm]) !== 0;
exports.hasRequestBit = hasRequestBit;
//# sourceMappingURL=index.js.map