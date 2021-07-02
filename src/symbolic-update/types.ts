import { PermKey, RoleGroup } from '../core/types'
import { operationKeys, symbolicRoleKeys } from './keys'

export type SymbolicRoleKey = typeof symbolicRoleKeys[number]

export type OperationKey = typeof operationKeys[number]

export type SymbolicKey = SymbolicRoleKey | OperationKey | PermKey

export type Symbolic = {
  roleGroup: RoleGroup
  permsGroup: PermsFlags[]
}

export type PermsFlags = {
  operation: OperationKey
  perms: PermKey[]
}

export type ApplySymbolicUpdateGroup = (
  updates: Symbolic[], mode: number
) => number

export type ApplySymbolicUpdate = (
  update: Symbolic, mode: number
) => number

export type ParseSymbolicUpdate = (symbolic: string) => Symbolic[]
