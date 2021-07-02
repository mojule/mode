import { PermKey, RoleKey } from './types';
export declare const hasBit: (role: RoleKey, perm: PermKey, mode: number) => boolean;
export declare const getBit: (role: RoleKey, perm: PermKey, mode: number) => number;
export declare const setBit: (role: RoleKey, perm: PermKey, mode: number) => number;
export declare const clearBit: (role: RoleKey, perm: PermKey, mode: number) => number;
export declare const hasRequestBit: (perm: PermKey, requestMode: number) => boolean;
