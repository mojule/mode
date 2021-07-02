import { permKeys, roleKeys } from './keys'
import { PermKey, RoleKey } from './types'

export const isPermKey = ( value: any ): value is PermKey =>
  permKeys.includes( value )

export const isRoleKey = ( value: any ): value is RoleKey =>
  roleKeys.includes( value )
