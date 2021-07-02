"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseSymbolicNotation = void 0;
const core_1 = require("../core");
const keys_1 = require("../core/keys");
const keys_2 = require("./keys");
const parseSymbolicNotation = notation => {
    let mode = 0;
    keys_1.roleKeys.forEach((roleKey, r) => {
        const i = r * keys_1.permKeys.length;
        keys_1.permKeys.forEach((permKey, p) => {
            const pos = i + p;
            const symbol = notation[pos];
            const isPerm = symbol === permKey;
            const isValid = isPerm || symbol === keys_2.nullKey;
            if (!isValid)
                throw Error(`Unexpected value in symbolic notation at position ${pos}: ${symbol}`);
            if (isPerm)
                mode = core_1.setBit(mode, roleKey, permKey);
        });
    });
    return mode;
};
exports.parseSymbolicNotation = parseSymbolicNotation;
//# sourceMappingURL=parse.js.map