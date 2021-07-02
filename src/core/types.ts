import { permKeys, roleKeys } from './keys'

export type RoleKey = typeof roleKeys[number]

export type PermKey = typeof permKeys[number]

export type RoleGroup = RoleKey[]

export type PermGroup = PermKey[]

export type AccessOptions = {
  isDirectory: boolean
  isRoot: boolean
  isOwner: boolean
  isGroup: boolean
  permissions: number
}

type BitFn<T = number> = (role: RoleKey, perm: PermKey, mode: number) => T

export type HasBit = BitFn<boolean>

export type GetBit = BitFn

export type SetBit = BitFn

export type ClearBit = BitFn

export type HasRequestBit = (perm: PermKey, requestMode: number) => boolean
