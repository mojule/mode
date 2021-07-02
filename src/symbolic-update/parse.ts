import { roleKeys } from '../core/keys'
import { isPermKey } from '../core/predicates'
import { RoleGroup } from '../core/types'
import { separatorKey } from './keys'
import { isOperationKey, isSymbolicKey, isSymbolicRoleKey } from './predicates'
import { ParseSymbolicUpdate, PermsFlags, Symbolic } from './types'

export const parseSymbolicUpdate: ParseSymbolicUpdate = symbolic =>
  symbolic.split(separatorKey).map(parseSet)

const parseSet = (input: string) => {
  const symbols = input.split('')

  symbols.forEach((symbol, i) => {
    if (!isSymbolicKey(symbol))
      throw Error(`Unexpected symbol at position ${i}: ${symbol}`)
  })

  let i = 0
  let previousLength = symbols.length

  const roleSet = takeSet(symbols, isSymbolicRoleKey)

  const roleGroup: RoleGroup = []

  if (roleSet.size === 0 || roleSet.has('a')) {
    roleGroup.push(...roleKeys)
  } else {
    roleKeys.forEach(
      k => {
        if (roleSet.has(k)) roleGroup.push(k)
      }
    )
  }

  i += previousLength - symbols.length
  previousLength = symbols.length

  const permsGroup: PermsFlags[] = []

  while (symbols.length) {
    const perms = takePerms(symbols)

    if (perms === undefined || symbols.length === previousLength)
      throw Error(`Unexpected symbol at position ${i}: ${symbols[0]}`)

    permsGroup.push(perms)

    i += previousLength - symbols.length
    previousLength = symbols.length
  }

  const symbolic: Symbolic = { roleGroup, permsGroup }

  return symbolic
}

const takePerms = (symbols: string[]): PermsFlags | undefined => {
  const operation = takeIf(symbols, isOperationKey)

  if (operation === undefined) return

  const perms = [...takeSet(symbols, isPermKey)]

  return { operation, perms }
}

const takeIf = <T extends string>(
  symbols: string[], predicate: (value: any) => value is T
) => {
  if (symbols.length) {
    const first = symbols[0]

    if (predicate(first)) {
      symbols.shift()

      return first
    }
  }
}

const takeSet = <T extends string>(
  symbols: string[], predicate: (value: any) => value is T
) => {
  const set = new Set<T>()

  let current = takeIf(symbols, predicate)

  while (current) {
    set.add(current)

    current = takeIf(symbols, predicate)
  }

  return set
}
