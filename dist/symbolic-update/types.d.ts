import { PermKey, RoleGroup } from '../core/types';
import { operationKeys, symbolicRoleKeys } from './keys';
export declare type SymbolicRoleKey = typeof symbolicRoleKeys[number];
export declare type OperationKey = typeof operationKeys[number];
export declare type SymbolicKey = SymbolicRoleKey | OperationKey | PermKey;
export declare type Symbolic = {
    roleGroup: RoleGroup;
    permsGroup: PermsFlags[];
};
export declare type PermsFlags = {
    operation: OperationKey;
    perms: PermKey[];
};
export declare type ApplySymbolicUpdateGroup = (mode: number, updates: Symbolic[]) => number;
export declare type ApplySymbolicUpdate = (mode: number, update: Symbolic) => number;
export declare type ParseSymbolicUpdate = (symbolic: string) => Symbolic[];
