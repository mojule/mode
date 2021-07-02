import { clearBit, setBit } from '../core'
import { permKeys } from '../core/keys'
import { PermKey, RoleKey } from '../core/types'

import {
  ApplySymbolicUpdate, ApplySymbolicUpdateGroup, OperationKey, PermsFlags, 
  Symbolic
} from './types'

export const applySymbolicUpdateGroup: ApplySymbolicUpdateGroup = (
  updates: Symbolic[], mode: number
) => 
  updates.reduce(
    ( mode, update ) => applySymbolicUpdate(update, mode), 
    mode
  )

export const applySymbolicUpdate: ApplySymbolicUpdate = (
  update: Symbolic, mode: number
) => {
  const { roleGroup, permsGroup } = update

  roleGroup.forEach(role => {
    permsGroup.forEach(perms => {
      mode = applyUpdateFromPermsFlags(perms, role, mode)
    })
  })

  return mode
}

const applyUpdateFromPermsFlags = (
  { operation, perms }: PermsFlags, destRole: RoleKey, mode: number
) => {
  const actions: Record<OperationKey, () => number> = {
    '+': () => addBitFromFlags(perms, destRole, mode),
    '-': () => clearBitFromFlags(perms, destRole, mode),
    '=': () =>
      permKeys.reduce(
        (mode, key) => copyBitFromFlags(perms, key, destRole, mode),
        mode
      )
  }

  return actions[operation]()
}

const copyBitFromFlags = (
  sourcePerms: PermKey[], perm: PermKey, role: RoleKey, mode: number
) => {
  if (sourcePerms.includes(perm)) return setBit(role, perm, mode)

  return clearBit(role, perm, mode)
}

const addBitFromFlags = (
  perms: PermKey[], role: RoleKey, mode: number
) =>
  perms.reduce(
    (mode, perm) => setBit(role, perm, mode),
    mode
  )

const clearBitFromFlags = (
  perms: PermKey[], role: RoleKey, mode: number
) =>
  perms.reduce(
    (mode, perm) => clearBit(role, perm, mode),
    mode
  )
