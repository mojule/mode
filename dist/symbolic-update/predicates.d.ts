import { SymbolicKey } from './types';
export declare const isSymbolicRoleKey: (value: any) => value is "a" | "u" | "g" | "o";
export declare const isOperationKey: (value: any) => value is "+" | "-" | "=";
export declare const isSymbolicKey: (value: any) => value is SymbolicKey;
