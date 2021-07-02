import { symbolicRoleKeys, operationKeys, symbolicKeys } from './keys'
import { SymbolicRoleKey, OperationKey, SymbolicKey } from './types'

export const isSymbolicRoleKey = (value: any): value is SymbolicRoleKey =>
  symbolicRoleKeys.includes(value)

export const isOperationKey = (value: any): value is OperationKey =>
  operationKeys.includes(value)

export const isSymbolicKey = (value: any): value is SymbolicKey =>
  symbolicKeys.includes(value)
