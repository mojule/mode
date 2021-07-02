"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSymbolicNotation = void 0;
const core_1 = require("../core");
const keys_1 = require("../core/keys");
const keys_2 = require("./keys");
const createSymbolicNotation = (mode) => {
    let notation = [];
    keys_1.roleKeys.forEach(roleKey => {
        keys_1.permKeys.forEach(permKey => {
            notation.push(core_1.hasBit(roleKey, permKey, mode) ? permKey : keys_2.nullKey);
        });
    });
    return notation.join('');
};
exports.createSymbolicNotation = createSymbolicNotation;
//# sourceMappingURL=index.js.map