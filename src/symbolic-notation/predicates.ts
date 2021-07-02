import { parseSymbolicNotation } from './parse'
import { SymbolicNotation } from './types'

export const isSymbolicNotation = (
  notation: string
): notation is SymbolicNotation => {
  try {
    parseSymbolicNotation(notation)

    return true
  } catch (err) {
    return false
  }
}
