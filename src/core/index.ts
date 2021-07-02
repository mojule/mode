import { accessMask, bitMasks } from './masks'
import { PermKey, RoleKey } from './types'

export const hasBit = ( role: RoleKey, perm: PermKey, mode: number ) => 
  getBit( role, perm, mode ) !== 0

export const getBit = ( role: RoleKey, perm: PermKey, mode: number ) => 
  mode & bitMasks[ role ][ perm ]

export const setBit = ( role: RoleKey, perm: PermKey, mode: number ) =>
  mode | bitMasks[ role ][ perm ]

export const clearBit = ( role: RoleKey, perm: PermKey, mode: number ) =>
  mode & ~bitMasks[ role ][ perm ]

export const hasRequestBit = ( perm: PermKey, requestMode: number ) =>
  ( requestMode & accessMask[ perm ] ) !== 0
