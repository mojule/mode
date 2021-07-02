import { accessMasks, rolePermMasks } from './masks'
import { ClearBit, GetBit, HasBit, HasRequestBit, SetBit } from './types'

export const hasBit: HasBit = (role, perm, mode) =>
  getBit(role, perm, mode) !== 0

export const getBit: GetBit = (role, perm, mode) =>
  mode & rolePermMasks[role][perm]

export const setBit: SetBit = (role, perm, mode) =>
  mode | rolePermMasks[role][perm]

export const clearBit: ClearBit = (role, perm, mode) =>
  mode & ~rolePermMasks[role][perm]

export const hasRequestBit: HasRequestBit = (perm, requestMode) =>
  (requestMode & accessMasks[perm]) !== 0
