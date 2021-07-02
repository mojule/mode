"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessMask = exports.bitMasks = exports.x = exports.w = exports.r = exports.o_x = exports.o_w = exports.o_r = exports.g_x = exports.g_w = exports.g_r = exports.u_x = exports.u_w = exports.u_r = void 0;
/*
  read by owner
*/
exports.u_r = 0o00400;
/*
  write by owner
*/
exports.u_w = 0o00200;
/*
  execute/search by owner ("search" applies for directories, and means that
  entries within the directory can be accessed)
*/
exports.u_x = 0o00100;
/*
  read by group
*/
exports.g_r = 0o00040;
/*
  write by group
*/
exports.g_w = 0o00020;
/*
  execute/search by group
*/
exports.g_x = 0o00010;
/*
  read by others
*/
exports.o_r = 0o00004;
/*
  write by others
*/
exports.o_w = 0o00002;
/*
  execute/search by others
*/
exports.o_x = 0o00001;
exports.r = 0o00004;
exports.w = 0o00002;
exports.x = 0o00001;
exports.bitMasks = {
    u: {
        r: exports.u_r,
        w: exports.u_w,
        x: exports.u_x
    },
    g: {
        r: exports.g_r,
        w: exports.g_w,
        x: exports.g_x
    },
    o: {
        r: exports.o_r,
        w: exports.o_w,
        x: exports.o_x
    }
};
exports.accessMask = {
    r: exports.r, w: exports.w, x: exports.x
};
//# sourceMappingURL=masks.js.map