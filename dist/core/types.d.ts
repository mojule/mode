import { permKeys, roleKeys } from './keys';
export declare type RoleKey = typeof roleKeys[number];
export declare type PermKey = typeof permKeys[number];
export declare type RoleGroup = RoleKey[];
export declare type PermGroup = PermKey[];
export declare type Process = {
    isDirectory: boolean;
    isRoot: boolean;
    isOwner: boolean;
    isGroup: boolean;
};
