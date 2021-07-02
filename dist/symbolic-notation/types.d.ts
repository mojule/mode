import { PermKey } from '../core/types';
import { nullKey } from './keys';
export declare type NullKey = typeof nullKey;
export declare type NullableKey<T extends PermKey> = T | NullKey;
export declare type NullablePerms = (`${NullableKey<'r'>}${NullableKey<'w'>}${NullableKey<'x'>}`);
export declare type SymbolicNotation = (`${NullablePerms}${NullablePerms}${NullablePerms}`);
