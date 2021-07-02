/* 
  read by owner
*/
export const u_r = 0o00400 as const

/* 
  write by owner
*/
export const u_w = 0o00200 as const

/* 
  execute/search by owner ("search" applies for directories, and means that 
  entries within the directory can be accessed)
*/
export const u_x = 0o00100 as const

/* 
  read by group
*/
export const g_r = 0o00040 as const

/* 
  write by group
*/
export const g_w = 0o00020 as const

/* 
  execute/search by group
*/
export const g_x = 0o00010 as const

/* 
  read by others
*/
export const o_r = 0o00004 as const

/* 
  write by others
*/
export const o_w = 0o00002 as const

/* 
  execute/search by others  
*/
export const o_x = 0o00001 as const

export const r = 0o00004 as const
export const w = 0o00002 as const
export const x = 0o00001 as const

export const bitMasks = {
  u: {
    r: u_r,
    w: u_w,
    x: u_x
  },
  g: {
    r: g_r,
    w: g_w,
    x: g_x
  },
  o: {
    r: o_r,
    w: o_w,
    x: o_x
  }
} as const

export const accessMask = {
  r, w, x
} as const

