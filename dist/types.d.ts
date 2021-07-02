import { AccessOptions } from '.';
export declare type UpdateMode = (mode: number, notation: string | number) => number;
export declare type CanAccess = (request: number, options?: Partial<AccessOptions>) => boolean;
