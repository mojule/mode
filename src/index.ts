import { hasBit, hasRequestBit } from './core'
import { permKeys } from './core/keys'
import { AccessOptions } from './core/types'
import { applySymbolicUpdateGroup } from './symbolic-update'
import { parseSymbolicUpdate } from './symbolic-update/parse'
import { CanAccess, UpdateMode } from './types'

export const updateMode: UpdateMode = (mode, notation) => (
  typeof notation === 'number' ?
    notation :
    applySymbolicUpdateGroup(mode, parseSymbolicUpdate(notation))
)

export const canAccess: CanAccess = (request, options = {}) => {
  const {
    isDirectory, isRoot, isGroup, isOwner, permissions
  } = getOptions(options)

  // root can do anything with directories
  if (isRoot && isDirectory) return true

  let requestedPerms = permKeys.filter(
    perm => hasRequestBit(request, perm)
  )

  // root cannot necessarily execute files
  if (isRoot && !requestedPerms.includes('x')) return true

  // if root we can ignore the other perms, we only need to see if we can x
  if (isRoot) requestedPerms = ['x']

  if (isOwner && requestedPerms.every(p => hasBit(permissions, 'u', p)))
    return true

  if (isGroup && requestedPerms.every(p => hasBit(permissions, 'g', p)))
    return true

  return requestedPerms.every(p => hasBit(permissions, 'o', p))
}

const defaultOpts: AccessOptions = {
  isDirectory: false,
  isRoot: false,
  isGroup: false,
  isOwner: false,
  permissions: 0o0000
}

const getOptions = (opts: Partial<AccessOptions>) =>
  Object.assign({}, defaultOpts, opts)

export const defaultAccessOptions = Object.freeze(getOptions({}))

export * from './core'
export * from './core/keys'
export * from './core/masks'
export * from './core/predicates'
export * from './core/types'

export * from './symbolic-notation'
export * from './symbolic-notation/keys'
export * from './symbolic-notation/parse'
export * from './symbolic-notation/predicates'
export * from './symbolic-notation/types'

export * from './symbolic-update'
export * from './symbolic-update/keys'
export * from './symbolic-update/parse'
export * from './symbolic-update/predicates'
export * from './symbolic-update/types'
