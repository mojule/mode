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
    const actions = {
        '+': () => addBitFromFlags(perms, destRole, mode),
        '-': () => clearBitFromFlags(perms, destRole, mode),
        '=': () => keys_1.permKeys.reduce((mode, key) => copyBitFromFlags(perms, key, destRole, mode), mode)
    };
    return actions[operation]();
};
const copyBitFromFlags = (sourcePerms, perm, role, mode) => {
    if (sourcePerms.includes(perm))
        return core_1.setBit(role, perm, mode);
    return core_1.clearBit(role, perm, mode);
};
const addBitFromFlags = (perms, role, mode) => perms.reduce((mode, perm) => core_1.setBit(role, perm, mode), mode);
const clearBitFromFlags = (perms, role, mode) => perms.reduce((mode, perm) => core_1.clearBit(role, perm, mode), mode);
//# sourceMappingURL=index.js.map