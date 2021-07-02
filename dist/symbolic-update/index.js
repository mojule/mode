"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applySymbolicUpdate = exports.applySymbolicUpdateGroup = void 0;
const core_1 = require("../core");
const keys_1 = require("../core/keys");
const applySymbolicUpdateGroup = (mode, updates) => updates.reduce(exports.applySymbolicUpdate, mode);
exports.applySymbolicUpdateGroup = applySymbolicUpdateGroup;
const applySymbolicUpdate = (mode, update) => {
    const { roleGroup, permsGroup } = update;
    roleGroup.forEach(role => {
        permsGroup.forEach(perms => {
            mode = applyUpdateFromPermsFlags(mode, perms, role);
        });
    });
    return mode;
};
exports.applySymbolicUpdate = applySymbolicUpdate;
const applyUpdateFromPermsFlags = (mode, { operation, perms }, destRole) => {
    const actions = {
        '+': () => addBitFromFlags(mode, perms, destRole),
        '-': () => clearBitFromFlags(mode, perms, destRole),
        '=': () => keys_1.permKeys.reduce((mode, key) => copyBitFromFlags(mode, perms, key, destRole), mode)
    };
    return actions[operation]();
};
const copyBitFromFlags = (mode, sourcePerms, perm, role) => {
    if (sourcePerms.includes(perm))
        return core_1.setBit(mode, role, perm);
    return core_1.clearBit(mode, role, perm);
};
const addBitFromFlags = (mode, perms, role) => perms.reduce((mode, perm) => core_1.setBit(mode, role, perm), mode);
const clearBitFromFlags = (mode, perms, role) => perms.reduce((mode, perm) => core_1.clearBit(mode, role, perm), mode);
//# sourceMappingURL=index.js.map