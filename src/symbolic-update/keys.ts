import { userKey, groupKey, otherKey, permKeys } from '../core/keys'

const all = 'a' as const

const symbolicRoles = [ userKey, groupKey, otherKey, all ] as const

export const symbolicRoleKeys = Object.freeze( symbolicRoles )

export const allKey = all
// ---

const plus = '+' as const
const minus = '-' as const
const equals = '=' as const

const operations = [ plus, minus, equals ] as const

export const operationKeys = Object.freeze( operations )

export const plusKey = plus
export const minusKey = minus
export const equalsKey = equals

// ---

const separator = ',' as const

export const separatorKey = separator

// ---

export const symbolicKeys = Object.freeze( 
  [ ...symbolicRoleKeys, ...operationKeys, ...permKeys ]
)
