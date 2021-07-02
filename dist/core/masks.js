"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessMasks = exports.permMasks = exports.rolePermMasks = exports.rwx = exports.wx = exports.rx = exports.rw = exports.x = exports.w = exports.r = exports.ox = exports.ow = exports.or = exports.gx = exports.gw = exports.gr = exports.ux = exports.uw = exports.ur = void 0;
// owner read
exports.ur = 0o00400;
// owner write
exports.uw = 0o00200;
/*
  owner execute/search

  "search" applies for directories, and means that entries within the directory
  can be accessed
*/
exports.ux = 0o00100;
// group read
exports.gr = 0o00040;
// group write
exports.gw = 0o00020;
// group execute/search
exports.gx = 0o00010;
// others read
exports.or = 0o00004;
// others write
exports.ow = 0o00002;
// others execute/search
exports.ox = 0o00001;
// access read
exports.r = 0o00004;
// access write
exports.w = 0o00002;
// access execute/search
exports.x = 0o00001;
exports.rw = exports.r | exports.w;
exports.rx = exports.r | exports.x;
exports.wx = exports.w | exports.x;
exports.rwx = exports.r | exports.w | exports.x;
exports.rolePermMasks = {
    u: {
        r: exports.ur,
        w: exports.uw,
        x: exports.ux
    },
    g: {
        r: exports.gr,
        w: exports.gw,
        x: exports.gx
    },
    o: {
        r: exports.or,
        w: exports.ow,
        x: exports.ox
    }
};
exports.permMasks = {
    ur: exports.ur, uw: exports.uw, ux: exports.ux, gr: exports.gr, gw: exports.gw, gx: exports.gx, or: exports.or, ow: exports.ow, ox: exports.ox
};
exports.accessMasks = {
    r: exports.r, w: exports.w, x: exports.x
};
//# sourceMappingURL=masks.js.map