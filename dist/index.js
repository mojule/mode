"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultAccessOptions = exports.canAccess = exports.updateMode = void 0;
const core_1 = require("./core");
const keys_1 = require("./core/keys");
const symbolic_update_1 = require("./symbolic-update");
const parse_1 = require("./symbolic-update/parse");
const updateMode = (mode, notation) => (typeof notation === 'number' ?
    notation :
    symbolic_update_1.applySymbolicUpdateGroup(mode, parse_1.parseSymbolicUpdate(notation)));
exports.updateMode = updateMode;
const canAccess = (request, options = {}) => {
    const { isDirectory, isRoot, isGroup, isOwner, permissions } = getOptions(options);
    // root can do anything with directories
    if (isRoot && isDirectory)
        return true;
    let requestedPerms = keys_1.permKeys.filter(perm => core_1.hasRequestBit(request, perm));
    // root cannot necessarily execute files
    if (isRoot && !requestedPerms.includes('x'))
        return true;
    // if root we can ignore the other perms, we only need to see if we can x
    if (isRoot)
        requestedPerms = ['x'];
    if (isOwner && requestedPerms.every(p => core_1.hasBit(permissions, 'u', p)))
        return true;
    if (isGroup && requestedPerms.every(p => core_1.hasBit(permissions, 'g', p)))
        return true;
    return requestedPerms.every(p => core_1.hasBit(permissions, 'o', p));
};
exports.canAccess = canAccess;
const defaultOpts = {
    isDirectory: false,
    isRoot: false,
    isGroup: false,
    isOwner: false,
    permissions: 0o0000
};
const getOptions = (opts) => Object.assign({}, defaultOpts, opts);
exports.defaultAccessOptions = Object.freeze(getOptions({}));
__exportStar(require("./core"), exports);
__exportStar(require("./core/keys"), exports);
__exportStar(require("./core/masks"), exports);
__exportStar(require("./core/predicates"), exports);
__exportStar(require("./core/types"), exports);
__exportStar(require("./symbolic-notation"), exports);
__exportStar(require("./symbolic-notation/keys"), exports);
__exportStar(require("./symbolic-notation/parse"), exports);
__exportStar(require("./symbolic-notation/predicates"), exports);
__exportStar(require("./symbolic-notation/types"), exports);
__exportStar(require("./symbolic-update"), exports);
__exportStar(require("./symbolic-update/keys"), exports);
__exportStar(require("./symbolic-update/parse"), exports);
__exportStar(require("./symbolic-update/predicates"), exports);
__exportStar(require("./symbolic-update/types"), exports);
//# sourceMappingURL=index.js.map