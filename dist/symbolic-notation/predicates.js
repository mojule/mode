"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSymbolicNotation = void 0;
const parse_1 = require("./parse");
const isSymbolicNotation = (notation) => {
    try {
        parse_1.parseSymbolicNotation(notation);
        return true;
    }
    catch (err) {
        return false;
    }
};
exports.isSymbolicNotation = isSymbolicNotation;
//# sourceMappingURL=predicates.js.map