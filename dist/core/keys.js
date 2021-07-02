"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeKey = exports.writeKey = exports.readKey = exports.permKeys = exports.otherKey = exports.groupKey = exports.userKey = exports.roleKeys = void 0;
const user = 'u';
const group = 'g';
const other = 'o';
const roles = [user, group, other];
exports.roleKeys = Object.freeze(roles);
exports.userKey = user;
exports.groupKey = group;
exports.otherKey = other;
// ---
const read = 'r';
const write = 'w';
const execute = 'x';
const perms = [read, write, execute];
exports.permKeys = Object.freeze(perms);
exports.readKey = read;
exports.writeKey = write;
exports.executeKey = execute;
//# sourceMappingURL=keys.js.map