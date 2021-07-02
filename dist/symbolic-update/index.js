"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applySymbolicUpdate = exports.applySymbolicUpdateGroup = void 0;
const core_1 = require("../core");
const keys_1 = require("../core/keys");
const applySymbolicUpdateGroup = (updates, mode) => {
    const reducer = (mode, update) => exports.applySymbolicUpdate(update, mode);
    return updates.reduce(reducer, mode);
};
exports.applySymbolicUpdateGroup = applySymbolicUpdateGroup;
const applySymbolicUpdate = (update, mode) => {
    const { roleGroup, permsGroup } = update;
    roleGroup.forEach(role => {
        permsGroup.forEach(perms => {
            mode = applyUpdateFromPermsFlags(perms, role, mode);
        });
    });
    return mode;
};
exports.applySymbolicUpdate = applySymbolicUpdate;
const applyUpdateFromPermsFlags = ({ operation, perms }, destRole, mode) => {
    switch (operation) {
        case '=': {
            keys_1.permKeys.forEach(key => {
                mode = copyBitFromFlags(perms, key, destRole, mode);
            });
            break;
        }
        case '+': {
            mode = addBitFromFlags(perms, destRole, mode);
            break;
        }
        case '-': {
            mode = clearBitFromFlags(perms, destRole, mode);
            break;
        }
    }
    return mode;
};
const copyBitFromFlags = (sourcePerms, perm, role, mode) => {
    if (sourcePerms.includes(perm))
        return core_1.setBit(role, perm, mode);
    return core_1.clearBit(role, perm, mode);
};
const addBitFromFlags = (perms, role, mode) => {
    const set = (mode, perm) => core_1.setBit(role, perm, mode);
    return perms.reduce(set, mode);
};
const clearBitFromFlags = (perms, role, mode) => {
    const clear = (mode, perm) => core_1.clearBit(role, perm, mode);
    return perms.reduce(clear, mode);
};
//# sourceMappingURL=index.js.map