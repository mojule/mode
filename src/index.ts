import { hasBit, hasRequestBit } from './core'
import { permKeys, roleKeys } from './core/keys'
import { Process } from './core/types'
import { applySymbolicUpdateGroup } from './symbolic-update'
import { parseSymbolicUpdate } from './symbolic-update/parse'

export const updateMode = ( notation: string | number, mode: number ) => {
  if( typeof notation === 'number' ) return notation
  
  const symb = parseSymbolicUpdate( notation )

  return applySymbolicUpdateGroup( symb, mode )
}

export const canAccess = ( 
  { isDirectory, isRoot, isGroup, isOwner }: Process, 
  mode: number, request: number  
) => {
  // root can do anything with directories
  if( isRoot && isDirectory ) return true

  let requestedPerms = permKeys.filter( 
    perm => hasRequestBit( perm, request ) 
  )

  // root cannot necessarily execute files
  if( isRoot && !requestedPerms.includes( 'x' ) ) return true

  // if root we can ignore the other perms, we only need to see if we can x
  if( isRoot ) requestedPerms = [ 'x' ]

  if( isOwner && requestedPerms.every( p => hasBit( 'u', p, mode ) ) )
    return true

  if( isGroup && requestedPerms.every( p => hasBit( 'g', p, mode ) ) )
    return true
  
  return requestedPerms.every( p => hasBit( 'o', p, mode ) )
}

export * from './core'
export * from './core/keys'
export * from './core/masks'
export * from './core/predicates'
export * from './core/types'

export * from './symbolic-notation'
export * from './symbolic-notation/keys'
export * from './symbolic-notation/parse'
export * from './symbolic-notation/predicates'
export * from './symbolic-notation/types'

export * from './symbolic-update'
export * from './symbolic-update/keys'
export * from './symbolic-update/parse'
export * from './symbolic-update/predicates'
export * from './symbolic-update/types'
