// owner read
export const ur = 0o00400 as const

// owner write
export const uw = 0o00200 as const

/* 
  owner execute/search

  "search" applies for directories, and means that entries within the directory 
  can be accessed  
*/
export const ux = 0o00100 as const

// group read
export const gr = 0o00040 as const

// group write
export const gw = 0o00020 as const


// group execute/search
export const gx = 0o00010 as const

// others read
export const or = 0o00004 as const

// others write
export const ow = 0o00002 as const

// others execute/search
export const ox = 0o00001 as const

// access read
export const r = 0o00004 as const

// access write
export const w = 0o00002 as const

// access execute/search
export const x = 0o00001 as const

export const rw = r | w
export const rx = r | x
export const wx = w | x
export const rwx = r | w | x

export const rolePermMasks = {
  u: {
    r: ur,
    w: uw,
    x: ux
  },
  g: {
    r: gr,
    w: gw,
    x: gx
  },
  o: {
    r: or,
    w: ow,
    x: ox
  }
} as const

export const permMasks = {
  ur, uw, ux, gr, gw, gx, or, ow, ox
}

export const accessMasks = {
  r, w, x
} as const
