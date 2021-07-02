import { permKeys, roleKeys } from './keys';
export declare type RoleKey = typeof roleKeys[number];
export declare type PermKey = typeof permKeys[number];
export declare type RoleGroup = RoleKey[];
export declare type PermGroup = PermKey[];
export declare type AccessOptions = {
    isDirectory: boolean;
    isRoot: boolean;
    isOwner: boolean;
    isGroup: boolean;
    permissions: number;
};
declare type BitFn<T = number> = (role: RoleKey, perm: PermKey, mode: number) => T;
export declare type HasBit = BitFn<boolean>;
export declare type GetBit = BitFn;
export declare type SetBit = BitFn;
export declare type ClearBit = BitFn;
export declare type HasRequestBit = (perm: PermKey, requestMode: number) => boolean;
export {};
