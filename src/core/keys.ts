const user = 'u' as const
const group = 'g' as const
const other = 'o' as const

const roles = [ user, group, other ] as const

export const roleKeys = Object.freeze( roles )

export const userKey = user
export const groupKey = group
export const otherKey = other

// ---

const read = 'r' as const
const write = 'w' as const
const execute = 'x' as const

const perms = [ read, write, execute ] as const

export const permKeys = Object.freeze( perms )

export const readKey = read
export const writeKey = write
export const executeKey = execute
