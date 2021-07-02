import { AccessOptions } from '.';
export declare type UpdateMode = (notation: string | number, mode: number) => number;
export declare type CanAccess = (request: number, options?: Partial<AccessOptions>) => boolean;
