import { accessMasks, rolePermMasks } from './masks'
import { ClearBit, GetBit, HasBit, HasRequestBit, SetBit } from './types'

export const hasBit: HasBit = (mode, role, perm) =>
  getBit(mode, role, perm) !== 0

export const getBit: GetBit = (mode, role, perm) =>
  mode & rolePermMasks[role][perm]

export const setBit: SetBit = (mode, role, perm) =>
  mode | rolePermMasks[role][perm]

export const clearBit: ClearBit = (mode, role, perm) =>
  mode & ~rolePermMasks[role][perm]

export const hasRequestBit: HasRequestBit = (requestMode, perm ) =>
  (requestMode & accessMasks[perm]) !== 0
