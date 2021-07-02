import { hasBit } from '../core'
import { permKeys, roleKeys } from '../core/keys'
import { PermKey } from '../core/types'
import { nullKey } from './keys'
import { CreateSymbolicNotation, NullKey, SymbolicNotation } from './types'

export const createSymbolicNotation: CreateSymbolicNotation = mode => {
  let notation: (PermKey | NullKey)[] = []

  roleKeys.forEach(roleKey => {
    permKeys.forEach(permKey => {
      notation.push(hasBit(roleKey, permKey, mode) ? permKey : nullKey)
    })
  })

  return notation.join('') as SymbolicNotation
}
