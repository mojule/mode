import { permKeys, roleKeys } from './keys'

export type RoleKey = typeof roleKeys[ number ]

export type PermKey = typeof permKeys[ number ]

export type RoleGroup = RoleKey[]

export type PermGroup = PermKey[]

export type EntryData = { 
  isDirectory: boolean
  isRoot: boolean
  isOwner: boolean
  isGroup: boolean
}
