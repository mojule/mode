import { clearBit, getBit, setBit } from '../core'
import { permKeys } from '../core/keys'
import { PermKey, RoleKey } from '../core/types'
import { PermsFlags, Symbolic } from './types'

export const applySymbolicUpdateGroup = (
  updates: Symbolic[], mode: number
) => {
  const reducer = (mode: number, update: Symbolic) =>
    applySymbolicUpdate(update, mode)

  return updates.reduce(reducer, mode)
}

export const applySymbolicUpdate = (
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
  switch (operation) {
    case '=': {
      permKeys.forEach(key => {
        mode = copyBitFromFlags(perms, key, destRole, mode)
      })
      break
    }
    case '+': {
      mode = addBitFromFlags(perms, destRole, mode)
      break
    }
    case '-': {
      mode = clearBitFromFlags(perms, destRole, mode)
      break
    }
  }

  return mode
}

const copyBitFromFlags = (
  sourcePerms: PermKey[], perm: PermKey, role: RoleKey, mode: number
) => {
  if (sourcePerms.includes(perm)) return setBit(role, perm, mode)

  return clearBit(role, perm, mode)
}

const addBitFromFlags = (
  perms: PermKey[], role: RoleKey, mode: number
) => {
  const set = (mode: number, perm: PermKey) => setBit(role, perm, mode)

  return perms.reduce(set, mode)
}

const clearBitFromFlags = (
  perms: PermKey[], role: RoleKey, mode: number
) => {
  const clear = (mode: number, perm: PermKey) => clearBit(role, perm, mode)

  return perms.reduce(clear, mode)
}
