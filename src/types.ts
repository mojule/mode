import { AccessOptions } from '.'

export type UpdateMode = (mode: number, notation: string | number) => number

export type CanAccess = (
  request: number, options?: Partial<AccessOptions>
) => boolean
