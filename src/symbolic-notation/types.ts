import { PermKey } from '../core/types'
import { nullKey } from './keys'

export type NullKey = typeof nullKey

export type NullableKey<T extends PermKey> = T | NullKey

export type NullablePerms = (
  `${NullableKey<'r'>}${NullableKey<'w'>}${NullableKey<'x'>}`
)

export type SymbolicNotation = (
  `${NullablePerms}${NullablePerms}${NullablePerms}`
)

export type CreateSymbolicNotation = (mode: number) =>
  string & SymbolicNotation

export type ParseSymbolicNotation = (notation: string) => number
