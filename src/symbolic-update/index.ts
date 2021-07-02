import { clearBit, setBit } from '../core'
import { permKeys } from '../core/keys'
import { PermKey, RoleKey } from '../core/types'

import {
  ApplySymbolicUpdate, ApplySymbolicUpdateGroup, OperationKey, PermsFlags,
  Symbolic
} from './types'

export const applySymbolicUpdateGroup: ApplySymbolicUpdateGroup = (
  mode, updates
) =>
  updates.reduce(applySymbolicUpdate, mode)

export const applySymbolicUpdate: ApplySymbolicUpdate = (mode, update) => {
  const { roleGroup, permsGroup } = update

  roleGroup.forEach(role => {
    permsGroup.forEach(perms => {
      mode = applyUpdateFromPermsFlags(mode, perms, role)
    })
  })

  return mode
}

const applyUpdateFromPermsFlags = (
  mode: number, { operation, perms }: PermsFlags, destRole: RoleKey
) => {
  const actions: Record<OperationKey, () => number> = {
    '+': () => addBitFromFlags(mode, perms, destRole),
    '-': () => clearBitFromFlags(mode, perms, destRole),
    '=': () =>
      permKeys.reduce(
        (mode, key) => copyBitFromFlags(mode, perms, key, destRole),
        mode
      )
  }

  return actions[operation]()
}

const copyBitFromFlags = (
  mode: number, sourcePerms: PermKey[], perm: PermKey, role: RoleKey
) => {
  if (sourcePerms.includes(perm)) return setBit(mode, role, perm)

  return clearBit(mode, role, perm)
}

const addBitFromFlags = (
  mode: number, perms: PermKey[], role: RoleKey
) =>
  perms.reduce(
    (mode, perm) => setBit(mode, role, perm),
    mode
  )

const clearBitFromFlags = (
  mode: number, perms: PermKey[], role: RoleKey
) =>
  perms.reduce(
    (mode, perm) => clearBit(mode, role, perm),
    mode
  )
