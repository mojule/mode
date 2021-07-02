import { AccessOptions } from '.'

export type UpdateMode = (notation: string | number, mode: number) => number

export type CanAccess = (
  request: number, options?: Partial<AccessOptions>
) => boolean
