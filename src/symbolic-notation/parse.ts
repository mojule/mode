import { setBit } from '../core'
import { permKeys, roleKeys } from '../core/keys'
import { nullKey } from './keys'
import { ParseSymbolicNotation } from './types'

export const parseSymbolicNotation: ParseSymbolicNotation = notation => {
  let mode = 0

  roleKeys.forEach((roleKey, r) => {
    const i = r * permKeys.length

    permKeys.forEach((permKey, p) => {
      const pos = i + p
      const symbol = notation[pos]
      const isPerm = symbol === permKey
      const isValid = isPerm || symbol === nullKey

      if (!isValid) throw Error(
        `Unexpected value in symbolic notation at position ${pos}: ${symbol}`
      )

      if (isPerm) mode = setBit(roleKey, permKey, mode)
    })
  })

  return mode
}
