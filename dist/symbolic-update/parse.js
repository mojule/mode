"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseSymbolicUpdate = void 0;
const keys_1 = require("../core/keys");
const predicates_1 = require("../core/predicates");
const keys_2 = require("./keys");
const predicates_2 = require("./predicates");
const parseSymbolicUpdate = symbolic => symbolic.split(keys_2.separatorKey).map(parseSet);
exports.parseSymbolicUpdate = parseSymbolicUpdate;
const parseSet = (input) => {
    const symbols = input.split('');
    symbols.forEach((symbol, i) => {
        if (!predicates_2.isSymbolicKey(symbol))
            throw Error(`Unexpected symbol at position ${i}: ${symbol}`);
    });
    let i = 0;
    let previousLength = symbols.length;
    const roleSet = takeSet(symbols, predicates_2.isSymbolicRoleKey);
    const roleGroup = [];
    if (roleSet.size === 0 || roleSet.has('a')) {
        roleGroup.push(...keys_1.roleKeys);
    }
    else {
        keys_1.roleKeys.forEach(k => {
            if (roleSet.has(k))
                roleGroup.push(k);
        });
    }
    i += previousLength - symbols.length;
    previousLength = symbols.length;
    const permsGroup = [];
    while (symbols.length) {
        const perms = takePerms(symbols);
        if (perms === undefined || symbols.length === previousLength)
            throw Error(`Unexpected symbol at position ${i}: ${symbols[0]}`);
        permsGroup.push(perms);
        i += previousLength - symbols.length;
        previousLength = symbols.length;
    }
    const symbolic = { roleGroup, permsGroup };
    return symbolic;
};
const takePerms = (symbols) => {
    const operation = takeIf(symbols, predicates_2.isOperationKey);
    if (operation === undefined)
        return;
    const perms = [...takeSet(symbols, predicates_1.isPermKey)];
    return { operation, perms };
};
const takeIf = (symbols, predicate) => {
    if (symbols.length) {
        const first = symbols[0];
        if (predicate(first)) {
            symbols.shift();
            return first;
        }
    }
};
const takeSet = (symbols, predicate) => {
    const set = new Set();
    let current = takeIf(symbols, predicate);
    while (current) {
        set.add(current);
        current = takeIf(symbols, predicate);
    }
    return set;
};
//# sourceMappingURL=parse.js.map